async function registerServiceWorker() {

    if ('serviceWorker' in navigator) {

        try {

            console.log('Hello. I\'m going to try registering a service worker for you. Hold on.');

            const registration = await navigator.serviceWorker.register('/serviceWorker.js');

            console.log('result', registration);

        } catch (e) {

            console.log('error registering service worker', e);

        }


    }

}





export default registerServiceWorker;