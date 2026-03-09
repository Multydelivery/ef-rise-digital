import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ChatMessage } from '@/types/lead';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const systemPrompt = `You are a professional lead qualification assistant for E&F Rise Digital, a digital marketing agency that helps local businesses grow through websites, SEO, social media, ads, and automation.

YOUR ROLE:
- Warmly greet visitors and understand their business challenges
- Ask thoughtful questions to qualify leads
- Collect: name, email, business name, city, service needed
- Recommend appropriate services

SERVICE CATEGORIES:
- Website Design, Branding, Social Media Management
- SEO, Paid Ads, AI Automation, Maintenance/Support

CONVERSATION RULES:
1. Ask only 1-2 questions at a time
2. Be conversational and friendly
3. Keep replies short (2-4 sentences)
4. Collect email before saying you've saved the lead

When you have name, email, business name, and service category, say:
"Great! I've saved your information. We'll reach out within 24 hours to discuss how we can help [BUSINESS NAME]."

Then recommend a package based on their needs.`;

export async function POST(req: Request) {
  try {
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your-gemini-api-key-here') {
      return NextResponse.json(
        { 
          error: 'Gemini API key not configured',
          message: 'Please add your FREE Gemini API key to .env.local. Get one at: https://aistudio.google.com/app/apikey'
        },
        { status: 500 }
      );
    }

    const { messages }: { messages: ChatMessage[] } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Get the Gemini model (using gemini-1.5-pro - stable free version)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    // Convert messages to Gemini format
    // Skip the initial assistant greeting if it's the first message
    const relevantMessages = messages[0]?.role === 'assistant' ? messages.slice(1) : messages;
    
    const chatHistory = relevantMessages.slice(0, -1).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    // Send the latest message with system prompt context
    const lastMessage = relevantMessages[relevantMessages.length - 1];
    const prompt = chatHistory.length === 0 
      ? `${systemPrompt}\n\nUser: ${lastMessage.content}`
      : lastMessage.content;

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const text = response.text();

    // Simple lead detection (you can enhance this)
    let toolsUsed = [];
    if (text.toLowerCase().includes("i've saved your information") || 
        text.toLowerCase().includes("we'll reach out")) {
      
      // Extract lead info from conversation (simplified)
      const convText = messages.map(m => m.content).join(' ');
      console.log('📋 LEAD CAPTURED (Gemini Test Mode):', {
        timestamp: new Date().toISOString(),
        conversation: convText.substring(0, 200)
      });
      toolsUsed.push('saveLead');
    }

    return NextResponse.json({
      message: text,
      toolsUsed: toolsUsed.length > 0 ? toolsUsed : undefined,
    });

  } catch (error: any) {
    console.error('Gemini Chat API error:', error);

    if (error?.message?.includes('API_KEY_INVALID')) {
      return NextResponse.json(
        { error: 'Gemini API key is invalid or missing' },
        { status: 500 }
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
    service: 'E&F Rise Digital AI Chat Agent (Google Gemini - FREE)',
    version: '1.0-gemini',
  });
}
