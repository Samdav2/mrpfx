#!/bin/bash

# Configuration
DEPLOY_DIR="deploy_cpanel"
ZIP_NAME="mrp_frontend_cpanel_deploy.zip"

echo "🚀 Starting cPanel deployment preparation..."

# 1. Build the project
# NOTE: Turbopack on Next.js 16 may return exit code 1 even when the build
# succeeds. We do NOT use "set -e" here so the script continues.
# We validate the output files instead of relying on exit codes.
# Using node directly ensures the script blocks until the build is fully done.
echo "🔨 Running Next.js build..."
node node_modules/.bin/next build
wait
echo "🔨 Build process finished."

# 2. Verify standalone output was actually generated
if [ ! -d ".next/standalone" ]; then
    echo "❌ ERROR: .next/standalone was NOT generated."
    echo "   The build failed before the standalone output step completed."
    echo "   Try running 'npm run build' manually and check for errors."
    exit 1
fi

if [ ! -f ".next/standalone/server.js" ]; then
    echo "❌ ERROR: .next/standalone/server.js is missing. Build incomplete."
    exit 1
fi

if [ ! -d ".next/standalone/.next/server" ]; then
    echo "❌ ERROR: .next/standalone/.next/server is missing. Build incomplete."
    exit 1
fi

echo "✅ Standalone build verified. .next/standalone contains server.js + .next/server/"

# 3. Create/Clean deployment directory
rm -rf $DEPLOY_DIR
rm -f $ZIP_NAME
mkdir -p $DEPLOY_DIR

echo "📦 Copying standalone files..."
# 4. Copy standalone build
# We use '/.' to ensure hidden files/directories (like .next/ and .env) are included.
cp -r .next/standalone/. $DEPLOY_DIR/

echo "📂 Copying static assets..."
# 5. Copy public and static assets (not included in standalone by default)
mkdir -p $DEPLOY_DIR/.next/static
cp -r public $DEPLOY_DIR/
cp -r .next/static/* $DEPLOY_DIR/.next/static/

echo "🛠 Integrating custom Passenger server.js..."
# 6. Rename the framework-generated server.js to next-server.js,
# then copy our custom Passenger-compatible wrapper as the new entry point.
if [ -f $DEPLOY_DIR/server.js ]; then
    mv $DEPLOY_DIR/server.js $DEPLOY_DIR/next-server.js
fi
cp passenger-server.js $DEPLOY_DIR/server.js

echo "📝 Copying settings JSON and package files..."
# 7. Copy settings JSON files (important for dynamic content)
cp *-settings.json $DEPLOY_DIR/ 2>/dev/null || true
cp youtube-settings.json $DEPLOY_DIR/ 2>/dev/null || true
cp package.json $DEPLOY_DIR/ 2>/dev/null || true
cp package-lock.json $DEPLOY_DIR/ 2>/dev/null || true

# 8. Copy .env.production to the deployment root as .env
if [ -f .env.production ]; then
    cp .env.production $DEPLOY_DIR/.env
fi

echo "🔄 Creating tmp/restart.txt to force cPanel Passenger restart..."
# 9. Force Passenger restart on upload
mkdir -p $DEPLOY_DIR/tmp
touch $DEPLOY_DIR/tmp/restart.txt

# 10. Final verification — make sure .next/server is in the deploy folder
if [ ! -d "$DEPLOY_DIR/.next/server" ]; then
    echo "❌ ERROR: $DEPLOY_DIR/.next/server is missing after copy. Package is broken."
    exit 1
fi

FILE_COUNT=$(find $DEPLOY_DIR/.next/server -type f | wc -l)
echo "✅ Deploy folder verified. .next/server has $FILE_COUNT files."

echo "🗜 Creating deployment zip..."
# 11. Zip the deployment directory
cd $DEPLOY_DIR
zip -r ../$ZIP_NAME .
cd ..

# 12. Verify .next/server is in the zip
NEXT_IN_ZIP=$(unzip -l $ZIP_NAME | grep -c "\.next/server/" || true)
echo ""
echo "✅ Deployment package created: $ZIP_NAME"
echo "   .next/server/ entries in zip: $NEXT_IN_ZIP"
echo "👉 Upload this zip to your cPanel application root and extract it."
