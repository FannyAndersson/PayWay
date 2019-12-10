const { exec } = require('child_process');

function useWebHook(app) {

    app.post('/api/github-webhook', (req, res) => {

        console.log('webhook hit! starting script! hold your horses!');

        
        try {
            console.log('request ref', req.body.ref);

            if (req.body.ref === 'refs/heads/master') {

                const childProcess = exec('sh deploy.sh')

                childProcess.stdout.on('data', chunk => {

                    console.log(chunk);

                });

                childProcess.on('close', (code) => {

                    console.log('Automatic Deployment script exited with code', code);

                });

                return res.status(200).end('Push to master, automatic deploy started.');

            } else {

                console.log(`---- PUSH TO ${req.body.ref} ---- NOT DEPLOYING ----`);

                return res.status(200).send('Not pushing to master, ignoring.');

            }

        } catch (e) {

            console.error('//// ERROR WITH DEPLOYMENT SCRIPT \\\\\\\\\\', e);

            res.status(500).json(e);

        }

    });
}

module.exports = useWebHook;
