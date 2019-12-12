const User = require('../mongoose-models/user.model');


function pushSubscribe(app){
    app.post('api/push-subscribe', async (req, res) =>{
        const subscription = req.body;

        res.status(201).json({ subscribing: true });

        sendNotification(subscription, { body: 'Welcome!' });
  setTimeout(
    () => sendNotification(subscription, { body: 'Still there?' }),
    30000
  );
    })
}


module.exports = pushSubscribe;