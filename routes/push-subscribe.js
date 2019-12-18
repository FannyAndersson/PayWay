const User = require('../mongoose-models/user.model');

function usePushSubscribe(app) {

    app.post('/api/push-subscribe', async (req, res) => {

        try {

            const user = await User.findById(req.session.user._id);

            const { subscription } = req.body;

            if (!user.subscriptions.some(({ endpoint }) => endpoint === subscription.endpoint)) {

                user.subscriptions.push(subscription);

                await user.save();

                res.status(200).send('success');

            } else {

                res.status(200).send('already subbed');

            }


        } catch (e) {

            res.status(500).json(e);

        }

    });

}

module.exports = usePushSubscribe;