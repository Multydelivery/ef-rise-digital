import nodemailer from 'nodemailer';
import type { Lead } from '@/types/lead';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendLeadNotification(lead: Omit<Lead, '_id'>) {
  const priorityEmoji = lead.score === 'high' ? '🔥' : lead.score === 'medium' ? '⭐' : '📋';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1f2937;">${priorityEmoji} New Lead from AI Chat Agent</h2>
      <p><strong>Priority:</strong> <span style="background: ${
        lead.score === 'high' ? '#ef4444' : lead.score === 'medium' ? '#f59e0b' : '#6b7280'
      }; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px;">${lead.score?.toUpperCase()}</span></p>
      
      <hr style="border: none; border-top: 2px solid #e5e7eb; margin: 20px 0;" />
      
      <h3 style="color: #374151; margin-bottom: 10px;">Contact Information</h3>
      <ul style="list-style: none; padding: 0;">
        <li style="margin: 8px 0;"><strong>Name:</strong> ${lead.name}</li>
        <li style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${lead.email}" style="color: #f59e0b;">${lead.email}</a></li>
        <li style="margin: 8px 0;"><strong>Business:</strong> ${lead.businessName}</li>
        <li style="margin: 8px 0;"><strong>City:</strong> ${lead.city}</li>
      </ul>
      
      <h3 style="color: #374151; margin: 20px 0 10px 0;">Service Needs</h3>
      <ul style="list-style: none; padding: 0;">
        <li style="margin: 8px 0;"><strong>Category:</strong> <span style="background: #fbbf24; padding: 2px 8px; border-radius: 3px;">${lead.serviceCategory}</span></li>
        <li style="margin: 8px 0;"><strong>Situation:</strong> ${lead.currentSituation}</li>
        ${lead.budget ? `<li style="margin: 8px 0;"><strong>Budget:</strong> ${lead.budget}</li>` : ''}
        ${lead.urgency ? `<li style="margin: 8px 0;"><strong>Timeline:</strong> ${lead.urgency}</li>` : ''}
      </ul>
      
      <hr style="border: none; border-top: 2px solid #e5e7eb; margin: 20px 0;" />
      
      <p style="color: #6b7280; font-size: 14px;"><strong>Received:</strong> ${lead.createdAt.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}</p>
      
      <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 20px;">
        <p style="margin: 0; color: #6b7280; font-size: 12px;">
          📱 This lead was captured by your AI chat agent on the E&F Rise Digital website.
        </p>
        <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 12px;">
          <strong>Next Steps:</strong> Reply within 24 hours to maintain high conversion rates!
        </p>
      </div>
    </div>
  `;
  
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: `${priorityEmoji} New ${lead.score?.toUpperCase()} Priority Lead: ${lead.businessName}`,
      html,
    });
    console.log(`✓ Lead notification sent for ${lead.businessName}`);
  } catch (error) {
    console.error('✗ Failed to send email notification:', error);
    // Don't throw - we don't want email failures to break lead capture
  }
}
