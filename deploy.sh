#!/bin/bash

# GitHub Pages Deployment Script for Florida HSWC Assessment Tool
# This script deploys your React app to GitHub Pages

set -e  # Exit on error

echo "🚀 Starting GitHub Pages Deployment..."
echo ""

# Step 1: Build the app
echo "📦 Step 1: Building the application..."
npm run build
echo "✅ Build complete!"
echo ""

# Step 2: Navigate to dist folder
echo "📁 Step 2: Preparing deployment files..."
cd dist

# Step 3: Initialize git in dist folder (if not already)
if [ ! -d .git ]; then
  git init
  git checkout -b gh-pages
fi

# Step 4: Add all files
git add -A

# Step 5: Commit
echo "💾 Step 3: Committing built files..."
git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

# Step 6: Add remote (if not already added)
git remote add origin https://github.com/erynms/6806FLHSWC.git 2>/dev/null || true

# Step 7: Force push to gh-pages branch
echo "🚢 Step 4: Pushing to GitHub Pages..."
echo ""
echo "⚠️  You will need to authenticate with GitHub."
echo "    Use your GitHub username and Personal Access Token (not password)"
echo ""

git push -f origin gh-pages

# Step 8: Return to main directory
cd ..

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your site will be live at: https://erynms.github.io/6806FLHSWC/"
echo "⏱️  It may take 1-2 minutes for changes to appear."
echo ""
echo "📋 Next step: Configure GitHub Pages"
echo "   1. Go to: https://github.com/erynms/6806FLHSWC/settings/pages"
echo "   2. Under 'Source', select: Deploy from a branch"
echo "   3. Under 'Branch', select: gh-pages and / (root)"
echo "   4. Click Save"
echo ""
