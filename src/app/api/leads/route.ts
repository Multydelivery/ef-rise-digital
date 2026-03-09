import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

// GET all leads (for admin dashboard)
// TODO: Add authentication before production use
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const score = searchParams.get('score');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    const db = await getDatabase();
    const query: any = {};
    
    if (status) query.status = status;
    if (score) query.score = score;
    
    const leads = await db
      .collection('leads')
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    
    return NextResponse.json({ 
      leads, 
      count: leads.length,
      filters: { status, score, limit }
    });
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

// PATCH - Update lead status
// TODO: Add authentication before production use
export async function PATCH(req: Request) {
  try {
    const { leadId, updates } = await req.json();
    
    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }
    
    const db = await getDatabase();
    const { ObjectId } = await import('mongodb');
    
    const result = await db.collection('leads').updateOne(
      { _id: new ObjectId(leadId) },
      { 
        $set: { 
          ...updates,
          updatedAt: new Date()
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Lead updated successfully'
    });
  } catch (error) {
    console.error('Failed to update lead:', error);
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}
