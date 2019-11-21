#!/bin/bash

# attempt automatic deployment
echo "Starting automatic deployment... please take a deep breath :)"

pm2 stop paywayapp
cd /var/www/PayWay
git fetch
git checkout master
git pull
pm2 start paywayapp

echo "Automatic deploy finished! Let's crack open a cold beer and enjoy this moment!"