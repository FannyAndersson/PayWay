const exec = require('child_process').exec;

function useWebHook(app) {

    app.post('/api/github-webhook', (req, res) => {

        console.log('webhook hit! starting script! hold your horses!');

        console.log('request', req.body);

        // exec('sh deploy.sh', (error, stdout, stderr) => {

        //     console.log(stdout);
        //     console.log(stderr);

        //     if (error !== null) {
        //         console.log(`exec error: ${error}`);
        //     }
        // });

        res.status(200).end();


    });
}

module.exports = useWebHook;