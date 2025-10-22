# AICliniMatch 2.0 - Demo Script

## Overview
This document provides ready-to-use demo scenarios for showcasing AICliniMatch's AI-powered referral capabilities.

---

## Demo Scenario 1: Cystic Fibrosis (Complete Flow)

### Context
**Clinician**: Dr. Anya Sharma (Primary Care)  
**Patient**: 28-year-old female with declining lung function  
**Goal**: Find urgent CF specialist consultation

### Step-by-Step Demo

#### 1. Create Referral Tab

**User Action**: Navigate to "Create Referral" tab

**User Input** (type in chat):
```
I have a 28-year-old patient with cystic fibrosis. She's been experiencing 
declining lung function over the past 6 months. She has Blue Cross Blue Shield 
insurance and is located in Boston. This is urgent - we need to see someone 
within the next 2 weeks.
```

**AI Response** (simulated):
```
✓ Got it! I've identified the condition as Cystic Fibrosis.
✓ Urgency level set to URGENT.
✓ Patient insurance: Blue Cross Blue Shield.
✓ Location: Boston.

Perfect! I have all the information needed. Click "Find Matching Specialists" 
to see AI-powered recommendations.
```

**Right Panel Shows**:
- ✓ Condition: Cystic Fibrosis
- ✓ Urgency: URGENT
- ✓ Insurance: Blue Cross Blue Shield
- ✓ Location: Boston

**User Action**: Click "Find Matching Specialists"

#### 2. AI Match Results Tab

**AI Displays 3 Ranked Specialists**:

**Rank #1: Dr. Lena Petrova, MD (95% Match)**
- Specialty: Pulmonology / Adult CF Program
- Institution: National Jewish Health, Denver, CO
- Distance: 12 miles
- Match Reasons:
  - ✨ 5 similar cases treated
  - ✨ CF specialist
  - ✨ In-network for Blue Cross Blue Shield
  - ✨ Running active CF trial (NCT05554321)
- Acceptance Rate: 94%
- Wait Time: 1-2 weeks
- Telehealth: Available

**Rank #2: Dr. Aisha Khan, MD (88% Match)**
- Specialty: Pediatric Pulmonology
- Institution: Boston Children's Hospital
- Distance: 45 miles
- Match Reasons:
  - ✨ Leading CF research
  - ✨ Accept pediatric & young adult patients
  - ✨ Running inhaled antibiotic trial
- Acceptance Rate: 87%
- Wait Time: 3-5 weeks
- Telehealth: Available

**Rank #3: Dr. Michael Brown, MD (82% Match)**
- Specialty: Pulmonology & Gastroenterology
- Institution: Emory University Hospital
- Distance: 78 miles
- Match Reasons:
  - ✨ Dual-specialist for CF complications
  - ✨ Expertise in GI manifestations
  - ✨ High patient satisfaction
- Acceptance Rate: 91%
- Wait Time: 2-4 weeks
- Telehealth: Available

**Sidebar Features**:

*Progressive Suggestions*:
- Add preferred distance filter
- Include telehealth options only
- Filter by clinical trial participation
- Sort by fastest response time

*AI Insights*:
- 💡 Dr. Petrova is currently running a clinical trial for similar cases
- 💡 Consider adding pulmonary rehabilitation as follow-up care
- 💡 All matched specialists accept your patient's insurance

**User Action**: Click "Send Secure Referral" on Dr. Petrova

**System Response**: 
- ✓ Success toast: "Referral Sent Successfully!"
- → Auto-redirect to "My Referrals" dashboard

#### 3. My Referrals Dashboard

**Summary Metrics Show**:
- Active Referrals: 1
- Completed This Month: 0
- Avg. Time to Acceptance: 2.3 days

**Referral Table Shows**:
| Patient | Specialist | Specialty | Urgency | Status | Progress | Last Updated |
|---------|-----------|-----------|---------|--------|----------|--------------|
| Patient [Redacted] | Dr. Lena Petrova, MD | Pulmonology | URGENT | Sent | [●]━[○]━[○]━[○] | Just now |

---

## Demo Scenario 2: Huntington's Disease (Genetic Focus)

### User Input:
```
Patient is a 42-year-old male with family history of Huntington's disease. 
He's showing early motor symptoms. We need genetic counseling and neurological 
evaluation. He has UnitedHealthcare and prefers telehealth. Located in Cleveland.
```

### Expected AI Extraction:
- ✓ Condition: Huntington's Disease
- ✓ Insurance: UnitedHealthcare
- ✓ Location: Cleveland
- ✓ Telehealth: Yes
- ✓ Urgency: Routine (default)

### Top Match:
**Dr. Marcus Thorne, MD (97% Match)**
- Movement Disorders Neurology
- Johns Hopkins Hospital, Baltimore, MD
- Match Reasons:
  - Leading HD expert
  - Running gene therapy trial
  - 15+ years HD research
  - In-network

---

## Demo Scenario 3: Osteoradionecrosis (Surgical Case)

### User Input:
```
I'm referring a 67-year-old patient who developed osteoradionecrosis of the 
mandible following radiation therapy for oral cancer. He needs surgical 
evaluation. Aetna PPO insurance. Patient is in Palo Alto.
```

### Expected AI Extraction:
- ✓ Condition: Osteoradionecrosis
- ✓ Insurance: Aetna PPO
- ✓ Location: Palo Alto
- ✓ Urgency: Routine

### Top Match:
**Dr. Eleanor Vance, MD, PhD (98% Match)**
- Head & Neck Surgical Oncology
- Stanford Health Care, Palo Alto, CA
- Distance: 8 miles
- Match Reasons:
  - ORN specialist
  - Microvascular reconstruction expert
  - 3 active ORN trials
  - In-network

---

## Demo Scenario 4: Follow-Up Questions (Incomplete Info)

### User Input (vague):
```
I have a patient who needs a specialist for a rare genetic condition.
```

### AI Response:
```
I've noted that information. To find the best specialists, I still need:
• condition/diagnosis
• urgency level
• insurance provider
• patient location

Could you provide these details?
```

### User Follow-Up:
```
It's Ehlers-Danlos syndrome, vascular type. Patient is in Baltimore with 
Medicare. This is urgent due to suspected aortic dissection risk.
```

### AI Response:
```
✓ Condition: Ehlers-Danlos Syndrome
✓ Urgency: URGENT
✓ Insurance: Medicare
✓ Location: Baltimore

Perfect! I have all the information needed. Click "Find Matching Specialists" 
to see AI-powered recommendations.
```

---

## Key Demo Talking Points

### 1. Conversational Intelligence
- "Notice how it understands natural language, not just keywords"
- "The AI extracts structured data from unstructured text"
- "It asks clarifying questions when information is missing"

### 2. Explainable AI
- "Every match comes with reasons - no black box"
- "Match scores are transparent (0-100%)"
- "You can see exactly why each specialist was recommended"

### 3. Progressive Refinement
- "The system suggests ways to improve your search"
- "It's adaptive - learns what you're looking for"
- "Contextual insights help you make better decisions"

### 4. Comprehensive Tracking
- "Visual progress tracking from sent to completed"
- "Filter and sort by any dimension"
- "Summary metrics show your referral patterns"

### 5. Clinical Focus
- "Built for clinicians, by understanding clinical workflows"
- "HIPAA-aware design (no PHI in demo)"
- "Integration-ready for EHR systems"

---

## Common Questions & Answers

### Q: Is this using a real AI?
**A**: Currently it's a prototype with simulated AI responses for demonstration. The production version will integrate with GPT-4 or Claude for true natural language understanding.

### Q: How does it know which specialists to match?
**A**: The AI considers multiple factors:
- Condition specialty alignment
- Insurance network compatibility
- Geographic proximity
- Clinical trial participation
- Historical acceptance rates
- Provider availability

### Q: Can I customize the matching algorithm?
**A**: Yes! The matching logic is in `src/utils/aiSimulator.ts` and can be configured for your institution's priorities.

### Q: Does it integrate with our EHR?
**A**: Not yet, but it's designed for SMART-on-FHIR integration. Phase 2 will include Epic/Cerner connectors.

### Q: What about patient privacy?
**A**: The prototype doesn't store any PHI. Production version will be HIPAA-compliant with encrypted storage and secure transmission.

---

## Pro Tips for Demos

1. **Start with the conversational interface** - it's the most impressive feature
2. **Show the real-time extraction** - type slowly to let people see the AI working
3. **Explain the match scores** - click on explainability chips
4. **Navigate through all 3 tabs** - show the complete workflow
5. **Demonstrate filters on dashboard** - show how easy tracking is
6. **Mention future integrations** - paint the vision

---

## Quick Test Commands

### Test CF Case (Quick):
```
Patient with cystic fibrosis, Blue Cross insurance, Boston, urgent.
```

### Test HD Case (Quick):
```
Huntington's disease patient, UnitedHealthcare, Cleveland, telehealth preferred.
```

### Test ORN Case (Quick):
```
Osteoradionecrosis after radiation, Aetna, Palo Alto.
```

---

## Demo Environment Setup

Before demo:
1. Start dev server: `npm run dev`
2. Open browser to `http://localhost:5173`
3. Open browser console (for debugging if needed)
4. Clear any existing referrals (refresh page)
5. Start on "Create Referral" tab

---

**Happy Demoing! 🎉**

