#!/bin/bash

# attempt automatic deployment
echo "--- Starting automatic deployment... please take a deep breath :) ---"

cd /var/www/PayWay
echo "--- Entered PayWay directory ---"
git fetch
echo "--- git fetched ---"
# if something is up
git checkout .
git checkout master
echo "--- checked out master branch ---"
git pull
echo "--- git pulled ---"
npm install
echo "--- npm installed in root dir ---"
cd frontend
npm install
echo "--- npm installed in frontend ---"
npm run build
echo "--- Completed frontend production build ---"
node postBuildScript
echo "--- POST BUILD SCRIPT COMPLETE ---"

echo "--- Automatic deploy finished! Let's crack open a cold beer and enjoy this moment! ---"

pm2 restart paywayapp