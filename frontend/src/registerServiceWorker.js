async function registerServiceWorker() {

    if ('serviceWorker' in navigator) {

        try {

            await navigator.serviceWorker.register('/serviceWorker.js');

        } catch {

            // silence is golden

        }


    }

}





export default registerServiceWorker;