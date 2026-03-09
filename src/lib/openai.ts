import OpenAI from 'openai';
import type { Lead, ServiceCategory } from '@/types/lead';
// import { getDatabase } from './mongodb'; // Temporarily disabled for testing

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt with safety rules
export const systemPrompt = `You are a professional lead qualification assistant for E&F Rise Digital, a digital marketing agency that helps local businesses grow through websites, SEO, social media, ads, and automation.

YOUR ROLE:
- Warmly greet visitors and understand their business challenges
- Ask thoughtful questions to qualify leads
- Classify needs into service categories
- Save qualified leads to the database
- Recommend appropriate services

SERVICE CATEGORIES:
- Website Design (new sites, redesigns, landing pages)
- Branding (logos, brand identity, visual design)
- Social Media Management (content, posting, engagement)
- SEO (Google rankings, local visibility, optimization)
- Paid Ads (Google Ads, Facebook Ads, campaign management)
- AI Automation (workflow automation, chatbots, AI tools)
- Maintenance / Support (ongoing updates, hosting, fixes)

CONVERSATION RULES:
1. Ask only 1-2 questions at a time - don't overwhelm
2. Be conversational and friendly, not robotic
3. Collect email before saving the lead
4. Keep replies short (2-4 sentences max)
5. Never promise specific pricing - say "typically starts at X" or "packages from X"
6. Never claim a project is confirmed - say "let's schedule a call to discuss"
7. Never invent portfolio examples or case studies
8. Focus on understanding their biggest problem first

QUALIFICATION FLOW:
1. Greet and ask what brings them here
2. Ask about their business (name, city, industry)
3. Understand current situation (do they have a website? what's not working?)
4. Identify service needs
5. Get contact info (name, email)
6. Ask budget range if appropriate
7. Call saveLead() once you have: name, email, businessName, serviceCategory
8. After saving, recommend a service package
9. Offer to book a consultation

Keep the tone professional but warm. You're helping real business owners solve real problems.`;

// Tool definitions
export const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'saveLead',
      description: 'Save a qualified lead to the database. Only call this after collecting at minimum: name, email, businessName, and serviceCategory. This creates a real business opportunity.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Full name of the contact person',
          },
          email: {
            type: 'string',
            description: 'Email address (must be valid format)',
          },
          businessName: {
            type: 'string',
            description: 'Name of their business or company',
          },
          city: {
            type: 'string',
            description: 'City where the business operates',
          },
          serviceCategory: {
            type: 'string',
            enum: [
              'Website Design',
              'Branding',
              'Social Media Management',
              'SEO',
              'Paid Ads',
              'AI Automation',
              'Maintenance / Support',
              'Multiple Services',
            ],
            description: 'Primary service category they need',
          },
          currentSituation: {
            type: 'string',
            description: 'Brief description of their current situation and what they need help with',
          },
          budget: {
            type: 'string',
            description: 'Their budget range or tier (e.g., "under $1000", "$1000-3000", "$3000+")',
          },
          urgency: {
            type: 'string',
            description: 'Timeline (e.g., "urgent", "this month", "next quarter", "exploring")',
          },
        },
        required: ['name', 'email', 'businessName', 'serviceCategory', 'currentSituation'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'recommendService',
      description: 'Recommend a specific E&F Rise Digital service package based on the lead\'s needs and budget',
      parameters: {
        type: 'object',
        properties: {
          serviceCategory: {
            type: 'string',
            enum: [
              'Website Design',
              'Branding',
              'Social Media Management',
              'SEO',
              'Paid Ads',
              'AI Automation',
              'Maintenance / Support',
            ],
            description: 'The service category to recommend',
          },
          budgetTier: {
            type: 'string',
            enum: ['starter', 'growth', 'premium'],
            description: 'Budget tier: starter (under $1k), growth ($1k-3k), premium ($3k+)',
          },
        },
        required: ['serviceCategory'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'bookConsultation',
      description: 'Offer to schedule a free consultation call. Use this when the lead is interested in moving forward.',
      parameters: {
        type: 'object',
        properties: {
          preferredTime: {
            type: 'string',
            description: 'Their preferred time or day for the consultation',
          },
        },
        required: ['preferredTime'],
      },
    },
  },
];

// Function execution
export async function executeFunction(
  name: string,
  args: any
): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    switch (name) {
      case 'saveLead':
        return await saveLead(args);
      
      case 'recommendService':
        return recommendService(args);
      
      case 'bookConsultation':
        return bookConsultation(args);
      
      default:
        return { success: false, message: 'Unknown function' };
    }
  } catch (error) {
    console.error(`Error executing ${name}:`, error);
    return { success: false, message: 'Function execution failed' };
  }
}

// Save lead to MongoDB
async function saveLead(args: Partial<Lead>) {
  // TEMPORARY: Simulating MongoDB save for testing
  // TODO: Re-enable MongoDB connection once setup is complete
  
  // Calculate lead score based on budget and urgency
  let score: 'low' | 'medium' | 'high' = 'medium';
  if (args.budget?.includes('3000+') || args.urgency === 'urgent') {
    score = 'high';
  } else if (args.budget?.includes('under') || args.urgency === 'exploring') {
    score = 'low';
  }
  
  const lead: Omit<Lead, '_id'> = {
    name: args.name!,
    email: args.email!,
    businessName: args.businessName!,
    city: args.city || 'Not specified',
    serviceCategory: args.serviceCategory!,
    currentSituation: args.currentSituation!,
    budget: args.budget,
    urgency: args.urgency,
    score,
    status: 'new',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  // TEMPORARY: Log to console instead of saving to MongoDB
  console.log('📋 LEAD CAPTURED (Test Mode - Not Saved to DB):', {
    name: lead.name,
    email: lead.email,
    business: lead.businessName,
    service: lead.serviceCategory,
    score: lead.score
  });
  
  // Simulate successful save
  // const db = await getDatabase();
  // const result = await db.collection('leads').insertOne(lead);
  
  // Phase 2: Send email notification (uncomment when ready)
  // await sendLeadNotification(lead);
  
  return {
    success: true,
    message: `Great! I've saved your information. ${score === 'high' ? 'I see this is a priority - ' : ''}We'll reach out within 24 hours to discuss how we can help ${args.businessName}.`,
    data: { leadId: 'test-' + Date.now(), score },
  };
}

// Recommend service package
function recommendService(args: { serviceCategory: ServiceCategory; budgetTier?: string }) {
  const recommendations: Record<ServiceCategory, { starter: string; growth: string; premium: string }> = {
    'Website Design': {
      starter: 'Our Starter Website Package includes a 5-page modern site with mobile optimization and basic SEO. Typically starts at $1,500.',
      growth: 'Our Growth Website Package includes custom design, 10+ pages, e-commerce capability, and SEO optimization. Packages from $3,000.',
      premium: 'Our Premium Website Package includes full custom development, advanced features, integrations, and ongoing support. Starting at $5,000+.',
    },
    'SEO': {
      starter: 'Our Local SEO Starter optimizes your Google Business Profile and local listings. Typically $500-800/month.',
      growth: 'Our SEO Growth Package includes local optimization, content creation, link building, and monthly reporting. Packages from $1,200/month.',
      premium: 'Our Premium SEO includes comprehensive strategy, technical optimization, content marketing, and competitive analysis. Starting at $2,500/month.',
    },
    'Social Media Management': {
      starter: 'Our Social Media Starter includes 8-12 posts/month on 2 platforms with basic graphics. Typically $600/month.',
      growth: 'Our Social Media Growth Package includes 16-20 posts/month, custom graphics, engagement management, and analytics. Packages from $1,200/month.',
      premium: 'Our Premium Social Media includes daily posting, video content, influencer outreach, and full community management. Starting at $2,500/month.',
    },
    'Paid Ads': {
      starter: 'Our Paid Ads Starter includes Google or Facebook campaign setup and basic management. Typically $800/month + ad spend.',
      growth: 'Our Paid Ads Growth Package includes multi-platform campaigns, A/B testing, and conversion optimization. Packages from $1,500/month + ad spend.',
      premium: 'Our Premium Ads Management includes full-funnel strategy, advanced targeting, retargeting, and detailed attribution. Starting at $3,000/month + ad spend.',
    },
    'Branding': {
      starter: 'Our Branding Starter includes logo design, color palette, and basic brand guidelines. Typically starts at $800.',
      growth: 'Our Branding Growth Package includes full brand identity, logo suite, brand guidelines, and business card design. Packages from $2,000.',
      premium: 'Our Premium Branding includes comprehensive brand strategy, full visual system, messaging framework, and brand training. Starting at $5,000+.',
    },
    'AI Automation': {
      starter: 'Our AI Automation Starter includes chatbot setup or one workflow automation. Typically starts at $1,200.',
      growth: 'Our AI Automation Growth Package includes multiple automations, CRM integration, and email sequences. Packages from $2,500.',
      premium: 'Our Premium AI Automation includes custom AI agents, full business process automation, and ongoing optimization. Starting at $5,000+.',
    },
    'Maintenance / Support': {
      starter: 'Our Maintenance Starter includes monthly updates, backups, and basic support. Typically $200/month.',
      growth: 'Our Maintenance Growth Package includes priority support, security monitoring, and regular updates. Packages from $400/month.',
      premium: 'Our Premium Maintenance includes 24/7 support, performance optimization, and dedicated account manager. Starting at $800/month.',
    },
    'Multiple Services': {
      starter: 'Since you need multiple services, we can create a custom starter bundle typically starting at $2,000.',
      growth: 'For multiple services, our Growth Bundles combine complementary services with priority support. Packages from $4,000.',
      premium: 'Our Premium Multi-Service packages provide comprehensive digital transformation with dedicated team support. Starting at $7,500+.',
    },
  };
  
  const tier = args.budgetTier || 'growth';
  const recommendation = recommendations[args.serviceCategory]?.[tier as keyof typeof recommendations[typeof args.serviceCategory]] || 
                        recommendations[args.serviceCategory]?.growth;
  
  return {
    success: true,
    message: recommendation,
    data: { serviceCategory: args.serviceCategory, tier },
  };
}

// Book consultation
function bookConsultation(args: { preferredTime: string }) {
  return {
    success: true,
    message: `Perfect! I've noted that ${args.preferredTime} works for you. We'll send a calendar invite to your email within the next few hours to confirm the consultation. During the call, we'll discuss your specific needs and create a custom plan for your business.`,
    data: { preferredTime: args.preferredTime },
  };
}
