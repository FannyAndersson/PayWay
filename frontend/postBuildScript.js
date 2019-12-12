const path = require('path');
const fs = require('fs');

const publicPath = path.resolve(__dirname, './public');
const buildPath = path.resolve(__dirname, './build');
const swPath = path.resolve(publicPath, './serviceWorker.js');
const swInBuildPath = path.resolve(buildPath, './serviceWorker.js');

// Removing service worker created by create-react-app
// and its precache-maniffest since we have our own
// service worker...
const filesInBuild = fs.readdirSync(buildPath);
filesInBuild.forEach(file => {
    if (
        file.indexOf('precache-manifest.') === 0 ||
        file.indexOf('service-worker.js') === 0
    ) {
        fs.unlinkSync(path.resolve(buildPath, file));
    }
});
console.log('Removed unnecessary files.');

// Changing this.version in the serviceWorker.js
let contents = fs.readFileSync(swPath, 'utf-8');

// Changing production to true in build/serviceWorker.js 
contents = contents.replace(
    /production = false/,
    'production = true'
);
fs.writeFileSync(swInBuildPath, contents, 'utf-8');
console.log('Changed production to true in build/serviceWorker.js');