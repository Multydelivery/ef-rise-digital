export interface Lead {
  _id?: string;
  name: string;
  email: string;
  businessName: string;
  city: string;
  serviceCategory: ServiceCategory;
  currentSituation: string;
  budget?: string;
  urgency?: string;
  score?: 'low' | 'medium' | 'high';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ServiceCategory = 
  | 'Website Design'
  | 'Branding'
  | 'Social Media Management'
  | 'SEO'
  | 'Paid Ads'
  | 'AI Automation'
  | 'Maintenance / Support'
  | 'Multiple Services';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
