const User = require('../mongoose-models/user.model');

function usePushSubscribe(app) {

    app.post('/api/push-subscribe', async (req, res) => {

        try {

            const user = await User.findById(req.session.user._id);

            const { subscription } = req.body;

            user.subscription = subscription;

            await user.save();

            res.status(200).send('success');

            console.log('finished work on', user);

        } catch (e) {

            res.status(500).json(e);

        }

        setTimeout(() => {


        })

    });

}

module.exports = usePushSubscribe;