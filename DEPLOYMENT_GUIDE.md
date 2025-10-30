# Manual Deployment Guide

Your Florida HSWC Assessment Tool is built and ready to deploy! Follow these steps to make it live.

## Current Status

✅ All code is committed to GitHub
✅ Application is built (dist/ folder ready)
✅ GitHub Actions workflow is configured
❌ Needs GitHub Pages to be enabled

---

## Quick Deploy (Option 1): GitHub Actions - 2 minutes

1. **Go to:** https://github.com/erynms/6806FLHSWC/settings/pages

2. **Under "Build and deployment":**
   - **Source:** Select "**GitHub Actions**"
   - Don't select a branch or folder
   - Just change the dropdown to "GitHub Actions"

3. **Trigger the deployment:**
   - Go to: https://github.com/erynms/6806FLHSWC/actions
   - You may see a workflow run automatically start
   - If not, click "Deploy to GitHub Pages" on the left
   - Click "Run workflow" (green button on the right)
   - Select branch: `claude/florida-hswc-assessment-tool-011CUdUd2kuCEcxtdCkn7C8q`
   - Click "Run workflow"

4. **Wait 2-3 minutes**

5. **Check your live site:** https://erynms.github.io/6806FLHSWC/

---

## Alternative Deploy (Option 2): Upload Built Files - 5 minutes

If GitHub Actions doesn't work for any reason:

### Step 1: Get the Built Files

The built files are in your local `dist/` folder:
```
dist/
├── index.html
└── assets/
    ├── index-BL3K4WcU.css
    └── index-xAwdqh7n.js
```

### Step 2: Create gh-pages Branch

1. Go to: https://github.com/erynms/6806FLHSWC
2. Click the branch dropdown (shows current branch name)
3. Type "**gh-pages**" in the search box
4. Click "**Create branch: gh-pages from claude/florida-hswc-assessment-tool...**"

### Step 3: Upload Files

1. **Make sure you're on gh-pages branch** (check branch dropdown)
2. Click "**Add file**" → "**Upload files**"
3. **Drag and drop** these files:
   - `index.html` from dist folder
   - The entire `assets` folder from dist folder
4. Scroll down and click "**Commit changes**"

### Step 4: Enable GitHub Pages

1. Go to: https://github.com/erynms/6806FLHSWC/settings/pages
2. **Source:** Select "**Deploy from a branch**"
3. **Branch:**
   - Select "**gh-pages**"
   - Folder: "**/ (root)**"
4. Click "**Save**"

### Step 5: Wait and Visit

1. Wait 1-2 minutes for deployment
2. Visit: **https://erynms.github.io/6806FLHSWC/**
3. You should see your assessment tool!

---

## Verification Checklist

Once deployed, verify these work:

- [ ] Welcome page loads with proper styling
- [ ] "Start Assessment" button works
- [ ] Can navigate through all 10 questions
- [ ] Results page displays recommendations
- [ ] Print button works
- [ ] "Start Over" returns to welcome page
- [ ] Mobile responsive (test on phone)

---

## Troubleshooting

### "404 - Page Not Found"
- GitHub Pages may take 1-2 minutes to deploy
- Make sure you selected the correct branch in Settings → Pages
- Check that index.html and assets folder are uploaded

### "Blank page or errors"
- Open browser console (F12)
- Check for errors
- Make sure both index.html AND assets/ folder were uploaded
- Assets must be in a folder called "assets" not "dist/assets"

### "Workflow failed" in Actions
- Click on the failed workflow to see error details
- Common issue: Need to enable Pages first (Settings → Pages → GitHub Actions)
- May need to enable Actions permissions (Settings → Actions → General)

---

## After Deployment

Once your site is live:

1. **Test thoroughly** - Complete the assessment multiple times
2. **Set up Firebase** - Follow FIREBASE_SETUP.md to collect data
3. **Share the link** - Distribute to Florida teachers
4. **Monitor responses** - Check Firebase Console regularly

---

## Need Help?

**Repository:** https://github.com/erynms/6806FLHSWC
**Live Site:** https://erynms.github.io/6806FLHSWC/
**Actions:** https://github.com/erynms/6806FLHSWC/actions
**Settings:** https://github.com/erynms/6806FLHSWC/settings/pages

If you continue to have issues, you can also:
- Check GitHub's Pages documentation
- Ask in GitHub Community forums
- Reach out to your institution's IT support

---

## Quick Reference Commands

If you need to rebuild locally:

```bash
# Rebuild the application
npm run build

# The built files will be in the dist/ folder
# Upload these to GitHub gh-pages branch
```

---

**Your app is ready! Just follow Option 1 or Option 2 above to make it live.** 🚀
