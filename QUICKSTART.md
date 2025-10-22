# 🚀 Quick Start Guide - AICliniMatch 2.0

## Prerequisites

- **Node.js** 18+ ([download here](https://nodejs.org/))
- **npm** or **yarn**

Check your versions:
```bash
node --version  # should be v18 or higher
npm --version
```

## Installation (3 steps)

### 1. Install Dependencies

```bash
cd /Users/madhuhaasgottimukkala/Desktop/AICliniMatch
npm install
```

This will install:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

### 2. Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 3. Open in Browser

Navigate to **http://localhost:5173**

## First Test

### Try the Conversational Interface

1. Go to **Create Referral** tab
2. Type: 
   ```
   I have a patient with cystic fibrosis. She's 28 years old, 
   has Blue Cross insurance, and lives in Boston. This is urgent.
   ```
3. Watch the AI extract:
   - ✓ Condition: Cystic Fibrosis
   - ✓ Urgency: URGENT
   - ✓ Insurance: Blue Cross Blue Shield
   - ✓ Location: Boston
4. Click **"Find Matching Specialists"**
5. View AI-matched results with explainability

## Troubleshooting

### Port Already in Use

If port 5173 is taken:
```bash
npm run dev -- --port 3000
```

### Module Not Found Errors

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

Ensure you have TypeScript installed:
```bash
npm install -g typescript
```

## Build for Production

```bash
npm run build    # Creates dist/ folder
npm run preview  # Preview production build
```

## File Structure

```
AICliniMatch/
├── src/
│   ├── App.tsx                    # Main app
│   ├── main.tsx                   # Entry point
│   ├── components/
│   │   ├── ReferralIntake.tsx    # Tab 1: Create Referral
│   │   ├── MatchResults.tsx      # Tab 2: AI Matches
│   │   └── ReferralsDashboard.tsx # Tab 3: My Referrals
│   ├── types/
│   │   └── index.ts              # TypeScript types
│   └── utils/
│       └── aiSimulator.ts        # AI logic
├── index-new.html                 # New HTML entry
├── package.json                   # Dependencies
└── tailwind.config.js            # Styling config
```

## Next Steps

- **Add more test cases**: Try different conditions (huntington's disease, osteoradionecrosis)
- **Explore the dashboard**: Send referrals and track them
- **Customize specialists**: Edit `src/utils/aiSimulator.ts`
- **Integrate real AI**: Replace simulator with OpenAI/Claude API

## Demo Credentials

The prototype uses a mock clinician:
- **Name**: Dr. Anya Sharma
- **Institution**: Palo Alto Primary Care

## Support

For questions or issues:
- Check `README-NEW.md` for detailed documentation
- Review component code in `src/components/`
- Inspect browser console for errors

---

**Happy coding! 🎉**

