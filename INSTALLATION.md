# Installation Guide - AICliniMatch 2.0

## Prerequisites Check

Before starting, verify you have the required tools:

### 1. Node.js (v18 or higher)

```bash
node --version
```

**Expected output**: `v18.x.x` or higher

**Don't have Node.js?**  
Download from: https://nodejs.org/

**Recommended**: Use the LTS (Long Term Support) version

### 2. npm (comes with Node.js)

```bash
npm --version
```

**Expected output**: `9.x.x` or higher

---

## Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd /Users/madhuhaasgottimukkala/Desktop/AICliniMatch
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- ✓ react@18.3.1
- ✓ react-dom@18.3.1
- ✓ typescript@5.3.3
- ✓ vite@5.1.0
- ✓ tailwindcss@3.4.1
- ✓ lucide-react@0.309.0
- ✓ @vitejs/plugin-react@4.2.1
- ✓ And dev dependencies...

**Expected duration**: 30-60 seconds

**Success indicators**:
```
added XXX packages, and audited XXX packages in XXs
found 0 vulnerabilities
```

### Step 3: Verify Installation

Check that `node_modules/` folder was created:

```bash
ls -la node_modules
```

You should see a large list of directories.

---

## Running the Application

### Development Mode (Recommended)

Start the development server with hot-reload:

```bash
npm run dev
```

**Expected output**:
```
  VITE v5.1.0  ready in 327 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

**What this means**:
- ✓ Development server is running
- ✓ Hot Module Replacement (HMR) is active
- ✓ Changes to code will auto-reload
- ✓ TypeScript is being checked
- ✓ Tailwind is compiling

### Open in Browser

Navigate to: **http://localhost:5173**

**What you should see**:
1. AICliniMatch header with logo
2. Three navigation tabs:
   - Create Referral
   - AI Match Results
   - My Referrals
3. Conversational chat interface on first tab

---

## Troubleshooting

### Issue 1: Port Already in Use

**Error**:
```
Port 5173 is already in use
```

**Solution**: Use a different port
```bash
npm run dev -- --port 3000
```

Then open: http://localhost:3000

### Issue 2: Module Not Found

**Error**:
```
Cannot find module 'react'
```

**Solution**: Clear and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue 3: TypeScript Errors

**Error**:
```
Cannot find name 'React'
```

**Solution**: Ensure TypeScript is installed
```bash
npm install -g typescript
```

### Issue 4: Tailwind Not Working

**Error**: Styles not applying

**Solution**: Restart dev server
```bash
# Press Ctrl+C to stop
npm run dev
```

### Issue 5: Blank Page

**Causes**:
1. JavaScript errors (check console)
2. Wrong URL
3. Build issues

**Solution**: Check browser console (F12 → Console tab)

---

## Production Build

### Build for Production

```bash
npm run build
```

**Expected output**:
```
vite v5.1.0 building for production...
✓ XXX modules transformed.
dist/index.html                   X.XX kB
dist/assets/index-XXXXXXX.js     XX.XX kB │ gzip: XX.XX kB
✓ built in XXXms
```

This creates a `dist/` folder with optimized files.

### Preview Production Build

```bash
npm run preview
```

Opens production build at: http://localhost:4173

---

## Verification Checklist

After installation, verify these work:

### ✅ Basic Functionality

1. **Navigate Tabs**
   - [ ] Click "Create Referral" tab
   - [ ] Click "AI Match Results" tab (disabled initially)
   - [ ] Click "My Referrals" tab

2. **Create Referral**
   - [ ] Type in chat: "Patient with cystic fibrosis"
   - [ ] See AI response
   - [ ] See extracted data in right panel
   - [ ] Click "Find Matching Specialists" when ready

3. **View Matches**
   - [ ] See 3 specialist cards
   - [ ] See match scores (e.g., 95%)
   - [ ] See explainability chips
   - [ ] Click "Send Secure Referral"

4. **Dashboard**
   - [ ] See referral in table
   - [ ] See progress tracker
   - [ ] See metrics cards
   - [ ] Use filters

### ✅ Visual Elements

- [ ] Gradient background loads
- [ ] Icons display correctly (Lucide)
- [ ] Hover effects work on cards
- [ ] Animations play (fade-in, slide-up)
- [ ] Responsive layout (resize browser)

### ✅ Console Check

Open browser console (F12 → Console):
- [ ] No red errors
- [ ] Optional: See `[AICliniMatch]` logs

---

## File Structure After Installation

```
AICliniMatch/
├── node_modules/           # ← Created by npm install
├── dist/                   # ← Created by npm run build
├── src/
│   ├── components/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index-new.html
├── package.json
├── package-lock.json       # ← Created by npm install
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── README-NEW.md
```

---

## Environment Configuration

### Development

No environment variables needed for prototype.

### Production (Future)

Create `.env` file:

```bash
VITE_API_URL=https://api.aiclini-match.com
VITE_OPENAI_API_KEY=sk-...
VITE_AUTH_DOMAIN=auth.aiclini-match.com
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Browser Compatibility

### Supported Browsers

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Not Supported

- ❌ Internet Explorer (any version)
- ❌ Chrome < 90
- ❌ Safari < 14

---

## Development Tools (Optional)

### React Developer Tools

Install browser extension:
- Chrome: https://chrome.google.com/webstore (search "React Developer Tools")
- Firefox: https://addons.mozilla.org/en-US/firefox (search "React Developer Tools")

**Usage**: F12 → "Components" tab

### TypeScript ESLint (Optional)

For better code quality:

```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

---

## Common Commands Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm list` | List installed packages |
| `npm outdated` | Check for updates |
| `npm update` | Update packages |

---

## Getting Help

### Check Documentation

1. **QUICKSTART.md** - Quick start guide
2. **README-NEW.md** - Comprehensive docs
3. **ARCHITECTURE.md** - Technical architecture
4. **DEMO-SCRIPT.md** - Usage examples

### Debug Mode

Run with verbose logging:

```bash
npm run dev -- --debug
```

### Clear Cache

If things break:

```bash
# Clear Vite cache
rm -rf .vite

# Clear npm cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps After Installation

1. ✅ **Test the prototype**
   - Try demo scenarios from `DEMO-SCRIPT.md`
   - Create multiple referrals
   - Explore all three tabs

2. ✅ **Review code**
   - Open `src/App.tsx` to see main structure
   - Look at `src/components/` for individual tabs
   - Check `src/utils/aiSimulator.ts` for AI logic

3. ✅ **Customize**
   - Add new conditions in `aiSimulator.ts`
   - Modify specialists data
   - Adjust match scoring algorithm
   - Change color scheme in `tailwind.config.js`

4. ✅ **Plan integration**
   - Review backend requirements
   - Plan API endpoints
   - Design database schema
   - Choose LLM provider (OpenAI/Claude)

---

## System Requirements

### Minimum

- **CPU**: 2 cores
- **RAM**: 4 GB
- **Disk**: 500 MB free space
- **OS**: macOS 10.15+, Windows 10+, Linux (modern)

### Recommended

- **CPU**: 4+ cores
- **RAM**: 8+ GB
- **Disk**: 1+ GB free space
- **OS**: Latest macOS/Windows/Linux

---

## Success Criteria

Installation is successful when:

1. ✅ `npm install` completes without errors
2. ✅ `npm run dev` starts server
3. ✅ Browser loads app at localhost:5173
4. ✅ Can type in chat and see AI responses
5. ✅ Can create referral and see matches
6. ✅ Can send referral and see in dashboard
7. ✅ No console errors (F12)

---

**Installation Version**: 2.0  
**Last Updated**: October 2025  
**Estimated Time**: 5-10 minutes  
**Difficulty**: Easy (standard npm project)

---

**Questions?** Check the other documentation files or review the code comments.

