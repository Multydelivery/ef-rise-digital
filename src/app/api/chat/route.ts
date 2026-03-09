import { NextResponse } from 'next/server';
import { openai, systemPrompt, tools, executeFunction } from '@/lib/openai';
import type { ChatMessage } from '@/types/lead';

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }
    
    // Add system prompt
    const messagesWithSystem = [
      { role: 'system' as const, content: systemPrompt },
      ...messages,
    ];
    
    // First completion - let the model decide if it needs tools
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Best balance for this use case
      messages: messagesWithSystem,
      tools,
      tool_choice: 'auto',
      temperature: 0.7,
      max_tokens: 500,
    });
    
    const responseMessage = completion.choices[0].message;
    
    // If the model wants to call functions
    if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
      // Execute all tool calls
      const toolResults = await Promise.all(
        responseMessage.tool_calls.map(async (toolCall) => {
          const functionName = toolCall.function.name;
          const functionArgs = JSON.parse(toolCall.function.arguments);
          
          console.log(`Executing function: ${functionName}`, functionArgs);
          
          const result = await executeFunction(functionName, functionArgs);
          
          return {
            tool_call_id: toolCall.id,
            role: 'tool' as const,
            content: JSON.stringify(result),
          };
        })
      );
      
      // Second completion - get final response after tool execution
      const finalCompletion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          ...messagesWithSystem,
          responseMessage,
          ...toolResults,
        ],
        temperature: 0.7,
        max_tokens: 500,
      });
      
      return NextResponse.json({
        message: finalCompletion.choices[0].message.content,
        toolsUsed: responseMessage.tool_calls.map(tc => tc.function.name),
      });
    }
    
    // No tools needed, return direct response
    return NextResponse.json({
      message: responseMessage.content,
    });
    
  } catch (error: any) {
    console.error('Chat API error:', error);
    
    // Handle OpenAI-specific errors
    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'OpenAI API key is invalid' },
        { status: 500 }
      );
    }
    
    if (error?.status === 429) {
      return NextResponse.json(
        { 
          error: 'OpenAI quota exceeded',
          message: 'Your OpenAI API key has no credits remaining. Please add credits at https://platform.openai.com/settings/organization/billing' 
        },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to process chat message. Please try again.' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'E&F Rise Digital AI Chat Agent',
    version: '1.0',
  });
}
