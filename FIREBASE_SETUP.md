# Firebase Setup Guide for Data Collection

This guide will help you set up Firebase to collect research data from the HSWC Assessment Tool.

**Time Required:** ~15 minutes
**Cost:** Free (Firebase free tier is more than sufficient)

---

## Why Firebase?

Firebase provides:
- ✅ Free cloud database (Firestore)
- ✅ Real-time data collection
- ✅ Easy data export to Excel/CSV
- ✅ Simple web dashboard to view responses
- ✅ No server maintenance required

---

## Step-by-Step Setup

### 1. Create a Firebase Account

1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Sign in with your Google account (or create one)
3. Click **"Add project"** or **"Create a project"**

### 2. Create Your Firebase Project

1. **Project name:** Enter `florida-hswc-assessment` (or your preferred name)
2. Click **Continue**
3. **Google Analytics:** Toggle OFF (not needed for this project)
4. Click **Create project**
5. Wait for setup to complete (~30 seconds)
6. Click **Continue** when ready

### 3. Set Up Firestore Database

1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. **Location:** Choose `us-central` or your nearest location
4. **Security rules:** Select **"Start in test mode"**
   - This allows your app to write data
   - We'll secure it later with rules
5. Click **"Enable"**
6. Wait for database creation (~1 minute)

You now have a database ready to receive data!

### 4. Get Your Firebase Configuration

1. In the left sidebar, click the ⚙️ **gear icon** next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **web icon** (`</>`) to add a web app
5. **App nickname:** Enter `HSWC Assessment Tool`
6. **Firebase Hosting:** Leave unchecked
7. Click **"Register app"**
8. You'll see a code snippet with `firebaseConfig`

**Copy this section:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefghijk"
};
```

9. Click **"Continue to console"**

### 5. Add Configuration to Your Project

1. **Open your project** in a code editor (VS Code, Notepad++, etc.)
2. Navigate to: `src/config/firebase.js`
3. Find this section:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

4. **Replace** the placeholder values with your actual values from step 4
5. **Save the file** (Ctrl+S or Cmd+S)

### 6. Test Your Setup

1. **Run the app locally:**
   ```bash
   npm run dev
   ```

2. **Open browser to:** `http://localhost:5173`

3. **Complete the assessment** with test data

4. **Check Firebase Console:**
   - Go back to [Firebase Console](https://console.firebase.google.com/)
   - Click on your project
   - Click **"Firestore Database"** in the left sidebar
   - You should see a new collection called **"assessments"**
   - Click on it to see your test response!

**If you see data:** 🎉 Success! Your setup is complete!

**If you don't see data:** See Troubleshooting below.

---

## Viewing Your Research Data

### Option 1: Firebase Console (Easy)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **"Firestore Database"**
4. Click on **"assessments"** collection
5. Browse individual responses

Each document shows:
- Timestamp
- All survey responses
- Calculated typology
- Feasibility score
- Recommendations

### Option 2: Export Data for Analysis

#### Export as JSON (Recommended)

1. In Firestore Database view
2. Click the **three dots** ⋮ next to "assessments"
3. Click **"Export collection"**
4. Save the file as `assessment_data.json`

#### Convert to Excel/CSV

1. Go to [https://www.convertcsv.com/json-to-csv.htm](https://www.convertcsv.com/json-to-csv.htm)
2. Upload your JSON file
3. Click **"Convert"**
4. Download the CSV file
5. Open in Excel or import to SPSS

---

## Securing Your Database (Important!)

By default, your database is in "test mode" which allows anyone to write data for 30 days. Let's secure it properly:

### Update Firestore Security Rules

1. In Firebase Console, go to **Firestore Database**
2. Click the **"Rules"** tab
3. Replace the existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow reading assessments (for your admin access)
    match /assessments/{assessment} {
      allow read: if true;  // Anyone can read (optional, remove if you want privacy)
      allow write: if true;  // Anyone can submit assessments
    }
  }
}
```

4. Click **"Publish"**

This allows:
- ✅ Anyone to submit assessment responses (needed for your tool)
- ✅ Reading data (so you can export it)
- ❌ Prevents unauthorized deletions or updates

---

## Understanding Your Data Structure

Each submitted assessment creates a document like this:

```json
{
  "timestamp": "2024-10-30T14:23:45.123Z",
  "sessionId": "session_xyz789_1698765432",

  "responses": {
    "schoolSize": "medium",
    "demographics": ["ell", "diverse-abilities"],
    "currentSupport": "tutoring",
    "adminSupport": 4,
    "budget": "moderate",
    "teacherKnowledge": "somewhat-familiar",
    "barrier": "space",
    "studentNeed": "both",
    "tutoringApproach": 3,
    "aiPriority": "very-important"
  },

  "recommendations": {
    "typology": "Pilot-Ready with Constraints",
    "feasibilityScore": 67,
    "feasibilityLevel": "Medium-High",
    "recommendedModel": "Targeted Pilot Program",
    "pedagogicalFramework": "Collaborative Agency Framework"
  }
}
```

### Key Fields for Analysis

- **timestamp:** When the assessment was completed
- **sessionId:** Unique identifier (anonymous)
- **responses:** All 10 survey answers
- **recommendations.typology:** School classification
- **recommendations.feasibilityScore:** 0-100 readiness score
- **recommendations.recommendedModel:** Suggested starting approach
- **recommendations.pedagogicalFramework:** Teaching approach recommendation

---

## Research Data Analysis Tips

### In Excel

**Useful Pivot Tables:**
1. **Typology Distribution:** Count of each typology
2. **Budget by Admin Support:** Cross-tabulation
3. **Average Feasibility Score by Typology:** Mean scores
4. **Barrier Frequency:** Count of each barrier type

**Useful Charts:**
1. Pie chart of typologies
2. Bar chart of feasibility scores
3. Histogram of admin support levels
4. Stacked bar chart of demographics

### In SPSS

**Import Steps:**
1. File > Import Data > Text/CSV
2. Select your CSV file
3. Set variable types appropriately
4. Run descriptive statistics

**Useful Analyses:**
1. **Frequencies:** All categorical variables
2. **Cross-tabulations:** Typology × Budget, Admin Support × Feasibility
3. **Correlations:** Admin Support vs Feasibility Score
4. **Chi-square:** Typology independence tests
5. **ANOVA:** Feasibility scores across typologies

### Research Questions to Explore

1. **What typologies are most common among Florida schools?**
   - Run frequency analysis on `typology` field

2. **How does administrative support affect feasibility?**
   - Correlation between `adminSupport` and `feasibilityScore`
   - T-test comparing high vs low admin support groups

3. **Is budget the primary barrier?**
   - Frequency of `barrier` field
   - Cross-tab barrier × budget level

4. **Do knowledgeable teachers prefer different pedagogies?**
   - Cross-tab `teacherKnowledge` × `pedagogicalFramework`
   - Chi-square test for independence

5. **How do demographics relate to needs?**
   - Cross-tab `demographics` × `studentNeed`
   - Schools with high ELL: do they prioritize LOC or HOC?

6. **What predicts "Ready for Implementation" status?**
   - Logistic regression with typology as outcome
   - Predictors: adminSupport, budget, teacherKnowledge

---

## Monitoring Data Collection

### Check Response Count

1. Firebase Console > Firestore Database
2. Click "assessments" collection
3. See document count in the header

### Set Up Email Alerts (Optional)

1. Firebase Console > Extensions
2. Browse for "Firestore Email Notifications"
3. Install to receive email when new assessments are submitted

---

## Troubleshooting

### "Firebase not initialized" Error

**Cause:** Configuration not added or incorrect

**Fix:**
1. Check `src/config/firebase.js` has your real config (no "YOUR_" placeholders)
2. Verify all fields are filled in
3. Make sure you saved the file
4. Restart the dev server: `npm run dev`

### "Permission denied" Error

**Cause:** Firestore rules are too restrictive

**Fix:**
1. Go to Firestore Database > Rules tab
2. Make sure you have: `allow write: if true;` for assessments
3. Click "Publish"

### Data Not Appearing in Firestore

**Cause:** Check browser console for errors

**Fix:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for red errors
4. Common issues:
   - Network errors: Check internet connection
   - Auth errors: Check Firebase rules
   - Module errors: Run `npm install` again

### Test Mode Expired (30 days)

**Cause:** Default test mode expires after 30 days

**Fix:**
1. Update Firestore rules (see "Securing Your Database" section)
2. Or temporarily extend test mode (not recommended for production)

---

## Privacy & Ethics

### What You're Collecting

✅ **Anonymous survey responses** (no names, emails, school names)
✅ **Timestamp** (when completed)
✅ **Generated recommendations** (system output)
✅ **Session ID** (random, not linked to identity)

❌ **No personally identifiable information** (unless user voluntarily provides email)
❌ **No IP addresses** stored
❌ **No tracking cookies**

### IRB Considerations

If you need IRB approval for your research:
- This tool collects **anonymous data by default**
- Users are informed via privacy notice on welcome page
- No deception involved
- Data used for educational research purposes
- Consider adding: "By submitting, you consent to anonymous data collection for research"

---

## Need Help?

**Firebase Documentation:** [https://firebase.google.com/docs/firestore](https://firebase.google.com/docs/firestore)

**Common Issues:**
- Configuration problems: Check `firebase.js` file
- Permission errors: Check Firestore rules
- Data export: Use Firebase Console export feature

**Contact Developer:**
If you encounter issues specific to this project, reach out to Eryn M. Spurling.

---

## Quick Reference: Common Commands

```bash
# Run app locally
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

**Firebase Console:** [https://console.firebase.google.com/](https://console.firebase.google.com/)

---

Good luck with your research! 🎓📊
