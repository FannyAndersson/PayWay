#!/bin/bash

# attempt automatic deployment
echo "Starting automatic deployment... please take a deep breath :)"

cd /var/www/PayWay
git fetch
git checkout master
git pull
npm install
cd frontend
npm install
npm run build

echo "Automatic deploy finished! Let's crack open a cold beer and enjoy this moment!"

pm2 restart paywayapp