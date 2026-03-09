# E&F Rise Digital - Website + AI Chat Agent

Digital marketing agency website with AI-powered lead capture and qualification.

## 🚀 Features

- 🤖 **AI Chat Agent** for lead qualification using OpenAI GPT-4o-mini
- 💾 **MongoDB Database** for lead storage and management
- 🎯 **Automatic Lead Scoring** (low/medium/high priority)
- 📧 **Email Notifications** for new leads (Phase 2)
- 📱 **Responsive Design** with Framer Motion animations
- 🔧 **Function Calling** - AI can save leads, recommend services, and book consultations

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **AI:** OpenAI GPT-4o-mini with Function Calling
- **Database:** MongoDB Atlas
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Language:** TypeScript
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier available)
- OpenAI API key

## 🚀 Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 2. Environment Setup

Copy the environment template:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual credentials:

```env
# Get your OpenAI API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-proj-your-actual-key-here

# Get MongoDB URI from: https://mongodb.com/cloud/atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/efrise
```

### 3. MongoDB Setup

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Add to `.env.local`

### 4. OpenAI Setup

1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an API key
3. Add to `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## 🤖 Testing the AI Agent

1. Click the chat button in the bottom-right corner
2. Try these example conversations:

**Example 1: Website Lead**
```
You: "I need a website for my restaurant"
Agent: [Asks for business name, city, contact info]
Agent: [Saves lead and recommends Website Design package]
```

**Example 2: Multiple Services**
```
You: "I need help with SEO and social media"
Agent: [Qualifies needs and budget]
Agent: [Recommends bundled package]
```

**Example 3: Urgent Lead**
```
You: "Urgent - need website ASAP, budget $5000"
Agent: [Scores as HIGH priority]
Agent: [Saves and offers immediate consultation]
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts           # AI chat endpoint
│   ├── layout.tsx                 # Root layout with ChatWidget
│   ├── page.tsx                   # Homepage
│   └── globals.css
├── components/
│   ├── ChatWidget.tsx             # AI chat interface
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Pricing.tsx
│   └── Services.tsx
├── lib/
│   ├── mongodb.ts                 # Database connection
│   └── openai.ts                  # OpenAI config & tools
└── types/
    └── lead.ts                    # TypeScript interfaces
```

## 🎯 How the AI Agent Works

### Service Categories
- Website Design
- Branding
- Social Media Management
- SEO
- Paid Ads
- AI Automation
- Maintenance / Support

### AI Tools (Function Calling)

**1. saveLead()**
- Saves qualified leads to MongoDB
- Requires: name, email, businessName, serviceCategory
- Auto-calculates lead score (low/medium/high)

**2. recommendService()**
- Recommends packages based on needs and budget
- Three tiers: Starter, Growth, Premium

**3. bookConsultation()**
- Schedules free consultation calls
- Collects preferred time

### Lead Scoring Algorithm
- **High Priority:** Budget $3000+ OR urgency is "urgent"
- **Low Priority:** Budget under $1000 OR urgency is "exploring"
- **Medium Priority:** Everything else

## 🔒 Safety Rules Built Into AI

The AI agent follows these rules:
- ✅ Never promises specific pricing without human confirmation
- ✅ Never claims a project is booked without verification
- ✅ Never invents portfolio examples or case studies
- ✅ Always collects email before saving leads
- ✅ Asks only 1-2 questions at a time
- ✅ Keeps replies short and professional (2-4 sentences)

## 🚀 Deployment

### Deploy to Vercel

1. Push to GitHub:
   ```bash
   git push origin master
   ```

2. Import to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. Add Environment Variables:
   - Go to Project Settings → Environment Variables
   - Add `OPENAI_API_KEY`
   - Add `MONGODB_URI`
   - Add any other variables from `.env.example`

4. Deploy!

### Important: Production Checklist
- [ ] Add environment variables in Vercel
- [ ] Test chat functionality after deployment
- [ ] Monitor MongoDB usage (free tier has limits)
- [ ] Check OpenAI API usage and billing

## 📊 Viewing Leads

Leads are stored in MongoDB in the `efrise` database, `leads` collection.

### View in MongoDB Atlas
1. Go to your MongoDB Atlas dashboard
2. Click "Browse Collections"
3. Find `efrise` → `leads`
4. See all captured leads with scores

### Lead Schema
```typescript
{
  name: "John Doe",
  email: "john@example.com",
  businessName: "John's Restaurant",
  city: "Austin",
  serviceCategory: "Website Design",
  currentSituation: "Need a new website with online ordering",
  budget: "$3000+",
  urgency: "this month",
  score: "high",           // auto-calculated
  status: "new",
  createdAt: "2026-03-09T...",
  updatedAt: "2026-03-09T..."
}
```

## 🔄 Phase 2: Email Notifications (Coming Soon)

To enable email notifications when leads are captured:

1. Configure email settings in `.env.local`
2. Create `src/lib/email.ts` (template provided)
3. Uncomment email notification line in `src/lib/openai.ts`

## 📈 Cost Estimates

### OpenAI (GPT-4o-mini)
- ~$0.00015 per chat interaction
- 1000 conversations ≈ $0.15

### MongoDB Atlas
- Free tier: 512MB storage
- Handles ~10,000+ leads easily

## 🐛 Troubleshooting

### Chat not responding
- Check `.env.local` has valid `OPENAI_API_KEY`
- Check browser console for errors
- Verify API endpoint at `/api/chat`

### Leads not saving
- Check `.env.local` has valid `MONGODB_URI`
- Verify MongoDB Atlas IP whitelist (allow all: 0.0.0.0/0)
- Check MongoDB connection in logs

### Build errors
- Run `npm install` again
- Clear `.next` folder: `rm -rf .next` or `Remove-Item .next -Recurse -Force`
- Check TypeScript errors: `npm run lint`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenAI Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)
- [MongoDB Atlas](https://mongodb.com/docs/atlas)
- [Vercel Deployment](https://vercel.com/docs)

## 📝 License

Private - E&F Rise Digital

## 💬 Support

For questions or issues:
- Email: oscar@efrisedigital.com
- This AI agent can be customized for other businesses too!

---

Built with ❤️ by E&F Rise Digital

