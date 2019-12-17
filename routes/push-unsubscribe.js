const User = require('../mongoose-models/user.model');

function usePushUnsubscribe(app) {

    app.post('/api/push-unsubscribe', async (req, res) => {

        try {

            const user = await User.findById(req.session.user._id);

            const { subscription } = req.body;

            if (user.subscriptions.some(({ endpoint }) => endpoint === subscription.endpoint)) {

                // remove users subscription when logging out
                user.subscriptions = user.subscriptions.filter(({ endpoint }) => endpoint !== subscription.endpoint);

                await user.save();

                res.status(200).send('success');

            } else {

                res.status(404).send('No such subscription');

            }


        } catch (e) {

            res.status(500).json(e);

        }

    });

}

module.exports = usePushUnsubscribe;