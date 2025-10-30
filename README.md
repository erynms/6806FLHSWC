# Florida HSWC Readiness Assessment Tool

A web application for assessing Florida high school readiness to implement High School Writing Centers (HSWC) and providing customized recommendations.

**Live Demo:** [https://erynms.github.io/6806FLHSWC/](https://erynms.github.io/6806FLHSWC/)

**Developed by:** Eryn M. Spurling
**Purpose:** Graduate research project on implementing writing centers in Florida high schools

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Firebase Setup for Data Collection](#firebase-setup-for-data-collection)
- [Making Updates](#making-updates)
- [Deploying Changes](#deploying-changes)
- [Accessing Research Data](#accessing-research-data)
- [Project Structure](#project-structure)
- [Support](#support)

---

## Overview

This tool helps Florida high school teachers assess their school's readiness to implement a High School Writing Center. Users complete a 10-question assessment and receive:

- **School typology classification** (e.g., "Motivated but Underfunded", "Ready for Implementation")
- **Feasibility assessment** with strengths, challenges, and opportunities
- **Recommended starting model** tailored to their context
- **Phased roadmap** with specific action steps and timelines
- **Pedagogical framework** matching their teaching philosophy
- **Key metrics** to track success
- **Immediate next steps** to get started

All responses are stored anonymously for research purposes.

---

## Features

✅ **10-Question Assessment** covering context and pedagogical preferences
✅ **Intelligent Recommendation Engine** with 6 school typologies
✅ **Comprehensive Reports** with actionable roadmaps
✅ **Mobile-Responsive Design** using Tailwind CSS
✅ **Firebase Data Collection** for research analysis
✅ **Print/Download Functionality** for reports
✅ **Privacy-Focused** - anonymous data collection by default

---

## Technology Stack

- **Frontend:** React 18 with Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Data Collection:** Firebase Firestore
- **Deployment:** GitHub Pages
- **Build Tool:** Vite

---

## Getting Started

### Prerequisites

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/erynms/6806FLHSWC.git
   cd 6806FLHSWC
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser to:** `http://localhost:5173`

The app should now be running locally!

---

## Firebase Setup for Data Collection

To collect research data, you need to set up Firebase. **This is essential for your dissertation research.**

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it "florida-hswc-assessment" (or your preferred name)
4. Disable Google Analytics (not needed for this project)
5. Click "Create project"

### Step 2: Set Up Firestore Database

1. In Firebase Console, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Select "Start in **test mode**" (we'll secure it later)
4. Choose location: `us-central` (or closest to you)
5. Click "Enable"

### Step 3: Get Your Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ > "Project settings"
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register app with nickname "HSWC Assessment"
5. Copy the `firebaseConfig` object

### Step 4: Add Configuration to Your Project

1. Open `src/config/firebase.js` in your code editor
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXX",  // Replace with your actual values
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxxxxxxxxx"
};
```

3. Save the file

### Step 5: Test Data Collection

1. Run the app locally: `npm run dev`
2. Complete the assessment
3. Go to Firebase Console > Firestore Database
4. You should see an "assessments" collection with your test response!

---

## Making Updates

### Editing Text Content

**To update welcome page text:**
- Open `src/components/Welcome.jsx`
- Find the text you want to change (it's in plain English)
- Edit and save

**To update recommendation logic:**
- Open `src/utils/recommendationEngine.js`
- All recommendation logic is clearly commented
- Edit typology descriptions, roadmaps, etc.

**To update questions:**
- Open `src/components/Assessment.jsx`
- Find the `sections` array
- Edit question text, options, or add new questions

### Testing Your Changes Locally

After making changes:

```bash
npm run dev
```

Visit `http://localhost:5173` to see your changes immediately.

---

## Deploying Changes

When you're ready to publish your updates to the live website:

### Option 1: Using GitHub Actions (Recommended - Automatic)

This project is set up to automatically deploy when you push to GitHub:

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Update welcome page text"

# Push to GitHub
git push -u origin claude/florida-hswc-assessment-tool-011CUdUd2kuCEcxtdCkn7C8q
```

Wait 2-3 minutes, then visit your live site. Changes should appear automatically!

### Option 2: Manual Deploy (If automatic doesn't work)

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

This will build and push directly to the `gh-pages` branch.

---

## Accessing Research Data

### View Data in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click "Firestore Database"
4. Click on "assessments" collection
5. Browse individual responses

### Export Data for Analysis

#### Method 1: Firebase Console (Simple)

1. In Firestore Database, click the three dots `⋮` next to "assessments"
2. Select "Export collection"
3. Choose format (JSON works with Excel/SPSS)
4. Download and open in your preferred analysis tool

#### Method 2: Using a Script (Advanced)

I've created a helper script for bulk export. Create a file `scripts/exportData.js`:

```javascript
// You'll need to install: npm install firebase-admin
const admin = require('firebase-admin');
const fs = require('fs');

// Initialize with your service account
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();

async function exportData() {
  const snapshot = await db.collection('assessments').get();
  const data = [];

  snapshot.forEach(doc => {
    data.push({ id: doc.id, ...doc.data() });
  });

  fs.writeFileSync('assessment_data.json', JSON.stringify(data, null, 2));
  console.log(`Exported ${data.length} responses to assessment_data.json`);
}

exportData();
```

Run with: `node scripts/exportData.js`

### Data Structure

Each assessment response contains:

```json
{
  "timestamp": "2024-10-30T12:34:56.789Z",
  "sessionId": "session_abc123_1234567890",
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

### Analyzing the Data

**For Excel:**
1. Convert JSON to CSV using [ConvertCSV](https://www.convertcsv.com/json-to-csv.htm)
2. Open in Excel
3. Use pivot tables to analyze typology distribution, feasibility scores, etc.

**For SPSS:**
1. Import JSON or CSV
2. Code categorical variables (typology, budget, etc.)
3. Run descriptive statistics, correlations, chi-square tests

**Key Research Questions to Explore:**
- What typologies are most common?
- How does admin support correlate with feasibility scores?
- Do teachers with writing center knowledge have different pedagogical preferences?
- What barriers are cited most frequently?
- Is budget the primary limiting factor?

---

## Project Structure

```
6806FLHSWC/
├── src/
│   ├── components/           # React components
│   │   ├── Welcome.jsx       # Landing page
│   │   ├── Assessment.jsx    # 10-question survey
│   │   └── Results.jsx       # Recommendation report
│   ├── utils/
│   │   └── recommendationEngine.js  # All recommendation logic
│   ├── config/
│   │   └── firebase.js       # Firebase configuration
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # App entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── dist/                     # Built files (auto-generated)
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # This file!
```

---

## Common Tasks

### Add a New Question

1. Open `src/components/Assessment.jsx`
2. Find the `sections` array
3. Add a new question object:

```javascript
{
  id: 'newQuestion',
  label: '11. Your New Question?',
  type: 'radio',  // or 'select', 'checkbox', 'slider'
  required: true,
  options: [
    { value: 'option1', label: 'First Option' },
    { value: 'option2', label: 'Second Option' },
  ],
}
```

4. Update `recommendationEngine.js` to use the new data

### Change Recommendation Logic

1. Open `src/utils/recommendationEngine.js`
2. Find the function you want to modify (all clearly labeled)
3. Edit the logic - it's all in plain JavaScript with comments
4. Test locally with `npm run dev`

### Update Styling/Colors

1. Open `tailwind.config.js`
2. Modify the `theme.extend.colors` section
3. Change `primary` colors to your preferred palette

---

## Troubleshooting

### "Firebase not initialized" error
- Make sure you've added your Firebase config to `src/config/firebase.js`
- Check that Firestore is enabled in Firebase Console

### Changes not appearing on live site
- Wait 2-3 minutes after pushing (GitHub Actions takes time)
- Check GitHub Actions tab in your repository for build status
- Clear your browser cache and refresh

### Build fails with "module not found"
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` folder and `package-lock.json`, then run `npm install` again

### Can't push to GitHub
- Make sure you're on the correct branch: `git branch`
- Set upstream: `git push -u origin claude/florida-hswc-assessment-tool-011CUdUd2kuCEcxtdCkn7C8q`

---

## Support & Contact

**Developer:** Eryn M. Spurling
**Email:** [your-email@example.com]
**Project Repository:** [https://github.com/erynms/6806FLHSWC](https://github.com/erynms/6806FLHSWC)

For technical issues or questions about the code, please open an issue on GitHub.

---

## License

This project is for educational and research purposes.

© 2024 Eryn M. Spurling - Florida High School Writing Centers Research Project

---

## Acknowledgments

This tool was developed as part of graduate research on implementing writing centers in Florida high schools. Special thanks to:

- Secondary School Writing Centers Association (SSWCA)
- International Writing Centers Association (IWCA)
- Florida Department of Education
- All the teachers and administrators who contributed feedback

---

## Version History

**v1.0.0** (October 2024)
- Initial release
- 10-question assessment
- 6 typology classifications
- Comprehensive recommendation reports
- Firebase data collection
- GitHub Pages deployment
