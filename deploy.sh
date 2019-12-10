#!/bin/bash

# attempt automatic deployment
echo "Starting automatic deployment... please take a deep breath :)"

cd /var/www/PayWay
echo "cd'ed into PayWay dir"
git fetch
echo "git fetched"
git checkout master
echo "checked out master"
git pull
echo "git pulled"
npm install
echo "npm installed in root dir"
cd frontend
echo "cd'ed to frontend"
npm 
echo "npm installed in frontend"
npm run build
echo "Completed frontend production build"

echo "Automatic deploy finished! Let's crack open a cold beer and enjoy this moment!"

pm2 restart paywayapp