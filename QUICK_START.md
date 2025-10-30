# Quick Start Guide for Complete Beginners

**Welcome!** This guide will help you get your HSWC Assessment Tool up and running, even if you've never coded before.

---

## What You Have

✅ A complete, working web application
✅ All code written and ready to deploy
✅ Comprehensive documentation
✅ Data collection system (Firebase) ready to set up

---

## What You Need to Do (3 Main Steps)

### Step 1: Set Up Firebase (15 minutes)

**Why?** This allows you to collect research data.

**How?**
1. Open the file **`FIREBASE_SETUP.md`** (in this folder)
2. Follow the step-by-step instructions
3. You'll create a free Firebase account and get your configuration

**Result:** You'll be able to collect anonymous survey responses for your research.

---

### Step 2: Deploy to the Web (5 minutes)

**Why?** So teachers can access your tool online.

**How?**

1. **Make sure all changes are saved** in your code editor

2. **Open Terminal** (or Command Prompt on Windows)

3. **Navigate to your project folder:**
   ```bash
   cd /path/to/6806FLHSWC
   ```

4. **Run these commands one by one:**
   ```bash
   git add .
   git commit -m "Initial deployment of HSWC Assessment Tool"
   git push -u origin claude/florida-hswc-assessment-tool-011CUdUd2kuCEcxtdCkn7C8q
   ```

5. **Wait 2-3 minutes** for automatic deployment

6. **Visit your live site:**
   `https://erynms.github.io/6806FLHSWC/`

**Result:** Your app is now live on the internet!

---

### Step 3: Enable GitHub Pages (One-time setup)

**If your site doesn't appear after Step 2:**

1. Go to [https://github.com/erynms/6806FLHSWC](https://github.com/erynms/6806FLHSWC)
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Source", select:
   - **Source:** GitHub Actions
5. Save and wait 2-3 minutes
6. Refresh the page - you'll see your site URL

---

## Using Your App

### Sharing with Teachers

Once deployed, share this link with Florida teachers:
```
https://erynms.github.io/6806FLHSWC/
```

They can:
- Complete the 10-question assessment
- Get instant, personalized recommendations
- Print/download their report

### Viewing Collected Data

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Sign in with your Google account
3. Click your project name
4. Click "Firestore Database" in sidebar
5. Click "assessments" collection
6. See all responses!

---

## Making Changes

### Change Text on Welcome Page

1. **Open:** `src/components/Welcome.jsx` in your code editor
2. **Find** the text you want to change (it's in plain English)
3. **Edit** and save
4. **Test locally:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173` to see changes
5. **Deploy changes:**
   ```bash
   git add .
   git commit -m "Updated welcome page text"
   git push
   ```
6. Wait 2-3 minutes, then refresh your live site

### Change Questions

1. **Open:** `src/components/Assessment.jsx`
2. **Find** the `sections` array (around line 20)
3. **Edit** question text or options
4. **Save** and test locally
5. **Deploy** (same git commands as above)

### Change Recommendation Logic

1. **Open:** `src/utils/recommendationEngine.js`
2. All functions are clearly labeled and commented
3. **Edit** the logic you want to change
4. **Test** locally to make sure it works
5. **Deploy** when satisfied

---

## Common Questions

### "I don't have a code editor"

**Download VS Code (free):**
- Windows/Mac/Linux: [https://code.visualstudio.com/](https://code.visualstudio.com/)
- Open the folder: File > Open Folder > Select `6806FLHSWC`

### "I don't have Git installed"

**Download Git:**
- Windows: [https://git-scm.com/download/win](https://git-scm.com/download/win)
- Mac: [https://git-scm.com/download/mac](https://git-scm.com/download/mac)
- Linux: `sudo apt-get install git` or `brew install git`

### "I don't have Node.js"

**Download Node.js:**
- All platforms: [https://nodejs.org/](https://nodejs.org/)
- Choose the "LTS" (Long Term Support) version
- Install with default settings

### "How do I open Terminal?"

**Windows:**
- Press `Win + R`
- Type `cmd` and press Enter

**Mac:**
- Press `Cmd + Space`
- Type "Terminal" and press Enter

**Linux:**
- Press `Ctrl + Alt + T`

### "Commands aren't working"

Make sure you're in the right folder:
```bash
cd /home/user/6806FLHSWC
```

Then try the command again.

---

## Getting Help

### Read the Docs

- **Full README:** `README.md` (comprehensive guide)
- **Firebase Setup:** `FIREBASE_SETUP.md` (data collection)
- **This Guide:** `QUICK_START.md` (you are here!)

### Check the Code

All code is commented and organized:
- **Components:** `src/components/` (UI pages)
- **Logic:** `src/utils/recommendationEngine.js` (the brain)
- **Config:** `src/config/firebase.js` (data collection)

### Ask for Help

If you're stuck:
1. Check the Troubleshooting section in `README.md`
2. Look for error messages in Terminal or browser console (F12)
3. Reach out to your instructor or technical support

---

## Next Steps

Once your app is live and Firebase is set up:

1. ✅ **Test it yourself** - Complete the assessment multiple times with different answers
2. ✅ **Share with colleagues** - Get feedback on usability and recommendations
3. ✅ **Promote to teachers** - Share the link via email, social media, conferences
4. ✅ **Monitor data** - Check Firebase weekly to see response counts
5. ✅ **Analyze results** - Export data when you have sufficient responses (30-50+)
6. ✅ **Present findings** - Use data for your dissertation/paper/presentation

---

## Checklist

Before sharing publicly, make sure:

- [ ] Firebase is set up and tested
- [ ] Site is live at `https://erynms.github.io/6806FLHSWC/`
- [ ] You've tested the full user flow (welcome → assessment → results)
- [ ] All text is proofread and accurate
- [ ] You can see test data in Firebase Console
- [ ] Contact information is updated (if you want teachers to reach you)

---

## You're Ready!

You now have:
✅ A professional assessment tool
✅ Data collection for research
✅ A live website to share
✅ The ability to make updates

**Good luck with your research project!** 🎓📊✨

---

## Quick Reference

**Live Site:** `https://erynms.github.io/6806FLHSWC/`

**Firebase Console:** `https://console.firebase.google.com/`

**Run Locally:**
```bash
npm run dev
```

**Deploy Changes:**
```bash
git add .
git commit -m "Description of changes"
git push
```

**View Data:**
Firebase Console > Your Project > Firestore Database > assessments

---

**Questions?** Check `README.md` for comprehensive documentation.
