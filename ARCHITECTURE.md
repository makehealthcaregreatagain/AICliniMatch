# AICliniMatch 2.0 - Architecture Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (Client)                      │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              React Application                      │    │
│  │                                                     │    │
│  │  ┌──────────────────────────────────────────────┐ │    │
│  │  │          App.tsx (Orchestrator)              │ │    │
│  │  │  • State Management                          │ │    │
│  │  │  • Tab Navigation                            │ │    │
│  │  │  • Data Flow Control                         │ │    │
│  │  └──────────────────────────────────────────────┘ │    │
│  │                                                     │    │
│  │  ┌─────────────┐ ┌──────────────┐ ┌────────────┐ │    │
│  │  │  Referral   │ │    Match     │ │ Referrals  │ │    │
│  │  │   Intake    │ │   Results    │ │ Dashboard  │ │    │
│  │  │             │ │              │ │            │ │    │
│  │  │ • Chat UI   │ │ • Cards      │ │ • Table    │ │    │
│  │  │ • Extract   │ │ • Filters    │ │ • Metrics  │ │    │
│  │  │ • Validate  │ │ • Actions    │ │ • Progress │ │    │
│  │  └─────────────┘ └──────────────┘ └────────────┘ │    │
│  │                                                     │    │
│  │  ┌──────────────────────────────────────────────┐ │    │
│  │  │        Utilities & Simulators                 │ │    │
│  │  │  • aiSimulator.ts                            │ │    │
│  │  │    - simulateAIResponse()                    │ │    │
│  │  │    - generateMatches()                       │ │    │
│  │  └──────────────────────────────────────────────┘ │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘

                              ↕
                    (Future Integration)
                              ↕

┌─────────────────────────────────────────────────────────────┐
│                      Backend Services                        │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐  │
│  │    LLM     │  │  Database  │  │   External APIs      │  │
│  │  (GPT-4)   │  │ PostgreSQL │  │ • ClinicalTrials.gov │  │
│  │            │  │            │  │ • PubMed             │  │
│  │            │  │            │  │ • EHR (FHIR)         │  │
│  └────────────┘  └────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow Architecture

### Flow 1: Create Referral → AI Matching

```
User Input (Natural Language)
        ↓
┌───────────────────────────┐
│   ReferralIntake.tsx      │
│   • handleSubmit()        │
│   • Collect user message  │
└───────────────────────────┘
        ↓
┌───────────────────────────┐
│   aiSimulator.ts          │
│   • simulateAIResponse()  │
│   • Extract data          │
│   • Validate completeness │
└───────────────────────────┘
        ↓
┌───────────────────────────┐
│   Extracted Data Object   │
│   {                       │
│     condition: string     │
│     urgency: string       │
│     insurance: string     │
│     location: string      │
│   }                       │
└───────────────────────────┘
        ↓
┌───────────────────────────┐
│   aiSimulator.ts          │
│   • generateMatches()     │
│   • Rank specialists      │
│   • Calculate scores      │
└───────────────────────────┘
        ↓
┌───────────────────────────┐
│   SpecialistMatch[]       │
│   • Ranked by score       │
│   • With explainability   │
└───────────────────────────┘
        ↓
┌───────────────────────────┐
│   App.tsx                 │
│   • setMatches()          │
│   • setActiveTab('results')│
└───────────────────────────┘
        ↓
┌───────────────────────────┐
│   MatchResults.tsx        │
│   • Display ranked cards  │
│   • Show explainability   │
└───────────────────────────┘
```

### Flow 2: Send Referral → Dashboard

```
User Action: "Send Secure Referral"
        ↓
┌───────────────────────────┐
│   MatchResults.tsx        │
│   • handleSend()          │
│   • Show toast            │
└───────────────────────────┘
        ↓
┌───────────────────────────┐
│   App.tsx                 │
│   • handleSendReferral()  │
│   • Create Referral obj   │
│   • Add to referrals[]    │
└───────────────────────────┘
        ↓
┌───────────────────────────┐
│   Referral Object         │
│   {                       │
│     id, patient, status   │
│     specialist, urgency   │
│     timestamps, notes     │
│   }                       │
└───────────────────────────┘
        ↓
┌───────────────────────────┐
│   ReferralsDashboard.tsx  │
│   • Display in table      │
│   • Show progress tracker │
│   • Update metrics        │
└───────────────────────────┘
```

---

## Component Hierarchy

```
<App>
  ├── <Header>
  │   ├── Logo
  │   ├── Title
  │   └── User Profile
  │
  ├── <NavigationTabs>
  │   ├── Create Referral (with badge)
  │   ├── AI Match Results (with badge)
  │   └── My Referrals (with badge)
  │
  └── <Main>
      │
      ├── [Tab 1] <ReferralIntake>
      │   ├── <ChatMessages>
      │   │   ├── <UserMessage>
      │   │   ├── <AssistantMessage>
      │   │   └── <TypingIndicator>
      │   │
      │   ├── <ChatInput>
      │   │   ├── <input>
      │   │   └── <SendButton>
      │   │
      │   └── <ExtractedDataPanel>
      │       ├── <DataField> × 5
      │       └── <FindMatchesButton>
      │
      ├── [Tab 2] <MatchResults>
      │   ├── <MatchCard> × 3-5
      │   │   ├── <MatchScoreBanner>
      │   │   ├── <SpecialistInfo>
      │   │   ├── <QuickStats>
      │   │   ├── <MatchReasons>
      │   │   ├── <InsuranceInfo>
      │   │   └── <Actions>
      │   │
      │   └── <Sidebar>
      │       ├── <ProgressiveSuggestions>
      │       ├── <AIInsights>
      │       └── <CaseSummary>
      │
      └── [Tab 3] <ReferralsDashboard>
          ├── <MetricCards> × 3
          ├── <Filters>
          └── <ReferralsTable>
              └── <ReferralRow> × N
                  ├── Patient Info
                  ├── Specialist
                  ├── <StatusBadge>
                  ├── <ProgressTracker>
                  └── Timestamp
```

---

## State Management

### Global State (App.tsx)

```typescript
type Tab = 'create' | 'results' | 'dashboard';

// State variables
const [activeTab, setActiveTab] = useState<Tab>('create');
const [extractedData, setExtractedData] = useState<ExtractedReferralData | null>(null);
const [matches, setMatches] = useState<SpecialistMatch[]>([]);
const [referrals, setReferrals] = useState<Referral[]>([]);
```

### Local State per Component

**ReferralIntake:**
```typescript
const [input, setInput] = useState('');
const [messages, setMessages] = useState<ConversationMessage[]>([]);
const [isProcessing, setIsProcessing] = useState(false);
const [extractedData, setExtractedData] = useState<ExtractedReferralData>({});
const [isComplete, setIsComplete] = useState(false);
```

**MatchResults:**
```typescript
const [showToast, setShowToast] = useState(false);
const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null);
```

**ReferralsDashboard:**
```typescript
const [filterStatus, setFilterStatus] = useState<ReferralStatus | 'all'>('all');
const [filterSpecialty, setFilterSpecialty] = useState<string>('all');
```

---

## Type System

### Core Types

```typescript
// Referral status progression
type ReferralStatus = 'sent' | 'accepted' | 'awaiting_visit' | 'completed' | 'declined';

// Urgency levels
type UrgencyLevel = 'routine' | 'urgent' | 'stat';

// Specialist match with AI metadata
interface SpecialistMatch {
  id: string;
  name: string;
  specialty: string;
  subspecialty?: string;
  location: string;
  distance: number;
  institution: string;
  insuranceAccepted: string[];
  matchScore: number;           // 0-100
  matchReasons: string[];       // Explainability
  waitTime: string;
  acceptanceRate: number;
  image: string;
  telehealth: boolean;
}

// Referral tracking object
interface Referral {
  id: string;
  patientName: string;
  patientCondition: string;
  specialist: string;
  specialty: string;
  urgency: UrgencyLevel;
  status: ReferralStatus;
  createdAt: Date;
  lastUpdated: Date;
  insurance?: string;
  notes?: string;
}

// Chat message
interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

// Extracted referral data
interface ExtractedReferralData {
  condition?: string;
  urgency?: UrgencyLevel;
  insurance?: string;
  location?: string;
  preferredDistance?: number;
  telehealth?: boolean;
  notes?: string;
}
```

---

## AI Simulation Logic

### Pattern Matching Algorithm

```typescript
function simulateAIResponse(
  userInput: string,
  currentData: ExtractedReferralData
): {
  response: string;
  data: Partial<ExtractedReferralData>;
  needsMoreInfo: boolean;
}

// Steps:
1. Convert input to lowercase
2. Check for condition keywords
   - "cystic fibrosis" → CF
   - "huntington" → HD
   - "osteoradionecrosis" → ORN
3. Check for urgency indicators
   - "urgent", "asap" → urgent
   - "stat", "emergency" → stat
4. Check for insurance mentions
   - "blue cross" → BCBS
   - "aetna" → Aetna PPO
5. Extract location via regex
   - Pattern: /in ([a-z\s]+, [a-z]{2})/i
6. Check for telehealth preference
7. Build response with checkmarks
8. Determine if more info needed
```

### Specialist Ranking Algorithm

```typescript
function generateMatches(
  data: ExtractedReferralData
): SpecialistMatch[]

// Steps:
1. Select specialist pool based on condition
2. Calculate base match scores
   - Specialty alignment: +30 points
   - Insurance match: +10 points
   - Geographic proximity: +5-15 points
   - Clinical trials: +10 points
   - High acceptance rate: +5 points
3. Generate explainability reasons
4. Filter by constraints (telehealth, distance)
5. Sort by match score descending
6. Return top 3-5 matches
```

---

## Styling Architecture

### Tailwind Configuration

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: { ... }, // Blue shades
    },
    animation: {
      'fade-in': 'fadeIn 0.3s ease-in',
      'slide-up': 'slideUp 0.4s ease-out',
      'pulse-slow': 'pulse 3s infinite',
    },
  },
}
```

### Custom CSS Classes

```css
/* index.css */
.gradient-bg {
  @apply bg-gradient-to-br from-blue-50 via-white to-indigo-50;
}

.card-hover {
  @apply transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5;
}

.ai-chip {
  @apply inline-flex items-center px-2.5 py-1 rounded-full text-xs
         font-medium bg-gradient-to-r from-blue-100 to-indigo-100
         text-blue-800 border border-blue-200;
}
```

---

## Build & Development

### Vite Configuration

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  // Fast HMR
  // Optimized production builds
  // Automatic code splitting
})
```

### Development Workflow

```bash
# Install
npm install

# Dev (Hot Module Replacement)
npm run dev
# → http://localhost:5173

# Build (Production)
npm run build
# → Creates dist/ folder

# Preview
npm run preview
# → Test production build
```

---

## Performance Considerations

### Bundle Optimization
- Tree-shaking (Vite automatic)
- Code splitting by route
- Lazy loading for large components
- Optimized SVG icons (Lucide)

### Rendering Optimization
- React key props for lists
- Memoization opportunities (future)
- Debounced search input (future)

### Network Optimization
- No external API calls (prototype)
- All data client-side
- Fast initial load (~200ms)

---

## Security & Privacy

### Current (Prototype):
- ✅ No PHI stored
- ✅ Patient names redacted
- ✅ Client-side only
- ✅ No authentication required

### Production Requirements:
- 🔒 HIPAA-compliant backend
- 🔒 Encrypted data transmission (HTTPS)
- 🔒 Encrypted data at rest
- 🔒 Role-based access control
- 🔒 Audit logging
- 🔒 Session management
- 🔒 Secure document upload (S3 + encryption)

---

## Extensibility Points

### Add New Condition:

**File**: `src/utils/aiSimulator.ts`

```typescript
// In simulateAIResponse()
if (lowerInput.includes('new_condition')) {
  extractedData.condition = 'New Condition Name';
}

// In generateMatches()
else if (condition.includes('new_condition')) {
  specialists = [
    // Add specialists for this condition
  ];
}
```

### Add New Match Reason:

```typescript
matchReasons: [
  'Existing reasons...',
  'New custom reason based on your criteria',
]
```

### Add New Status:

```typescript
// types/index.ts
type ReferralStatus = 
  'sent' | 'accepted' | 'awaiting_visit' | 'completed' | 'declined' | 'new_status';
```

---

## Future Integration Points

### LLM API Integration

Replace `simulateAIResponse()` with:

```typescript
async function extractFromLLM(userInput: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: EXTRACTION_PROMPT },
        { role: 'user', content: userInput },
      ],
    }),
  });
  return await response.json();
}
```

### Backend API Integration

```typescript
// Replace local state with API calls
async function sendReferral(data: Referral) {
  await fetch('/api/referrals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

async function fetchReferrals() {
  const response = await fetch('/api/referrals');
  return await response.json();
}
```

---

## Testing Strategy (Future)

### Unit Tests
- Component rendering
- AI extraction logic
- Match scoring algorithm
- State management

### Integration Tests
- Full referral flow
- Tab navigation
- Data persistence

### E2E Tests
- User workflows
- Error handling
- Edge cases

---

## Deployment Options

### Static Hosting
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages

### Full-Stack
- AWS (EC2 + RDS + S3)
- Google Cloud Platform
- Azure
- Heroku

---

**Architecture Version**: 2.0  
**Last Updated**: October 2025  
**Complexity**: Moderate (3 main components, clear separation)  
**Scalability**: High (React component model)

