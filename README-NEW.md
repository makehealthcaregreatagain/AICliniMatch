# AICliniMatch 2.0 - AI-Powered Referral Platform

## Overview

AICliniMatch 2.0 is a complete redesign of the referral management system, now featuring an **AI-powered, conversational interface** that transforms how clinicians create and manage specialist referrals.

### Key Features

✨ **Conversational Referral Intake**
- Natural language input - describe cases as you would to a colleague
- Real-time AI extraction of key information (condition, urgency, insurance, location)
- Intelligent follow-up questions when information is missing
- Visual summary of extracted data

🎯 **AI-Powered Specialist Matching**
- Ranked specialist recommendations with match scores
- Explainability tags showing why each specialist was matched
- Progressive search refinement suggestions
- Contextual AI insights and recommendations

📊 **Comprehensive Dashboard**
- Visual referral tracking with progress indicators
- Status filters and specialty filters
- Key metrics (active referrals, completion rates, avg. response time)
- Horizontal progress tracker: Sent → Accepted → Awaiting Visit → Completed

## Architecture

### Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- No backend required (prototype/demo mode)

### Component Structure

```
src/
├── App.tsx                        # Main app with tab navigation
├── components/
│   ├── ReferralIntake.tsx        # Conversational intake interface
│   ├── MatchResults.tsx          # AI match results with explainability
│   └── ReferralsDashboard.tsx    # Referral tracking dashboard
├── types/
│   └── index.ts                  # TypeScript interfaces
└── utils/
    └── aiSimulator.ts            # AI response and matching logic
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Usage Guide

### 1. Create Referral Tab

The conversational interface allows you to describe patient cases naturally:

**Example Input:**
```
"I have a 34-year-old patient with cystic fibrosis who needs a specialist consultation. 
She has Blue Cross Blue Shield insurance and is located in Boston. 
This is urgent - her lung function has been declining."
```

The AI will extract:
- Condition: Cystic Fibrosis
- Urgency: Urgent
- Insurance: Blue Cross Blue Shield
- Location: Boston

### 2. AI Match Results Tab

View ranked specialists with:
- **Match Score** (e.g., 95% match)
- **Explainability Tags** (e.g., "5 similar cases treated", "In-network")
- **Quick Stats** (acceptance rate, wait time)
- **Contact Options** (send referral, call)
- **AI Insights** (clinical trials, related specialists)

### 3. My Referrals Dashboard

Track all referrals with:
- Visual progress indicators
- Status filtering (sent, accepted, awaiting visit, completed)
- Specialty filtering
- Summary metrics
- Last updated timestamps

## Design Philosophy

### AI-First Experience

- **Conversational**: Natural language input instead of forms
- **Transparent**: Explainability at every step
- **Adaptive**: Progressive suggestions based on context
- **Intelligent**: Real-time extraction and matching

### Clinical Design Principles

- **Clean & Professional**: Medical-grade UI (white/blue palette)
- **Fast & Efficient**: Streamlined workflows
- **Trust-Building**: Clear data sources and reasoning
- **HIPAA-Aware**: No PHI storage (patient names redacted in demo)

## Future Enhancements

### Phase 2 Features
- [ ] Real AI integration (OpenAI GPT-4, Claude)
- [ ] EHR integration (SMART-on-FHIR)
- [ ] Live ClinicalTrials.gov API
- [ ] PubMed API for publications
- [ ] Secure document upload
- [ ] Fax/email automation

### Phase 3 Features
- [ ] Patient-facing self-referral portal
- [ ] Insurance authorization workflows
- [ ] Outcome tracking
- [ ] Provider feedback system
- [ ] Multi-language support

## Current Limitations (Demo Mode)

- **Simulated AI**: Uses pattern matching, not real LLM
- **Static Data**: Specialists are hardcoded mock data
- **No Persistence**: Data resets on page refresh
- **No Authentication**: Single-user prototype
- **No Backend**: All logic runs client-side

## Component Details

### ReferralIntake Component

**Props:**
- `onSubmit: (data: ExtractedReferralData, matches: SpecialistMatch[]) => void`

**Features:**
- Chat-style message interface
- Real-time typing indicators
- Data extraction panel with validation icons
- "Find Matching Specialists" CTA when ready

### MatchResults Component

**Props:**
- `matches: SpecialistMatch[]`
- `extractedData: ExtractedReferralData | null`
- `onSendReferral: (specialist: SpecialistMatch) => void`

**Features:**
- Match score banners
- Explainability chips
- Quick stats (acceptance rate, wait time)
- Progressive refinement suggestions
- AI insights sidebar
- Send referral action with success toast

### ReferralsDashboard Component

**Props:**
- `referrals: Referral[]`

**Features:**
- Summary metrics cards
- Filter by status and specialty
- Comprehensive table view
- Visual progress tracker
- Relative timestamps

## Styling Guide

### Custom Tailwind Classes

```css
.gradient-bg        → Subtle gradient background
.card-hover         → Smooth hover elevation
.ai-chip           → Explainability tag styling
.match-badge       → Status badge styling
```

### Color Palette

- **Primary**: Blue 600 (#2563eb)
- **Secondary**: Indigo 600 (#4f46e5)
- **Success**: Green 600 (#16a34a)
- **Warning**: Orange 600 (#ea580c)
- **Error**: Red 600 (#dc2626)

## Contributing

This is a prototype/demo. For production deployment:

1. Replace `aiSimulator.ts` with real AI API calls
2. Implement backend API for data persistence
3. Add authentication and authorization
4. Integrate with real data sources (ClinicalTrials.gov, PubMed)
5. Add comprehensive error handling
6. Implement proper state management (Redux, Zustand)
7. Add analytics and monitoring

## License

Proprietary - Stanford University Project

---

**Version**: 2.0.0  
**Last Updated**: October 2025  
**Contact**: Dr. Anya Sharma (demo user)

