const Transaction = require('../mongoose-models/transaction.model');
const User = require('../mongoose-models/user.model');
const webpush = require('web-push');

function sendMoney(app, socket) {
    app.post('/api/send-money', async(req, res) => {
        const { user } = req.session;

        if (!user) {
            // return statement just to terminate function, only calling send() doesn't stop rest of function from executing
            return res.status(400).send('You must be logged in to send money!');
        }

        try {
            // get sender id from the users session
            const senderId = user._id;

            // if message doesn't exist on req.body it will default to an empty string
            // (recipient should be a phone number)
            let { recipient, amount, message = '' } = req.body;

            const sender = await User.findById(senderId);

            // this shouldn't happen, but it might
            if (!sender) {
                return res.status(500).send('sender does not exist in db');
            }

            //check if sender try to send money to himself
            if(recipient === sender.phone) {
                return res.status(400).json({errorCode: 'selfie'});
            }

            // check that sender has enogugh money
            if (sender.balance < amount) {
                return res.status(400).json('You do not have enough money!');
            }

            //check that amount is not over limit
            if(sender.limit < amount) {
                return res.status(400).json({errorCode: 'overLimit'});
            }

            // convert phone nr to string just in case
            const actualRecipient = await User.findOne({ phone: String(recipient) });


            if (!actualRecipient) {
                return res.status(404).json('No such user');
            }

            // show me the money
            const transaction = new Transaction({
                recipient: actualRecipient._id,
                sender: sender._id,
                amount,
                message,
            });

            const result = await transaction.save();

            const dataForNotification = await Transaction.findById(transaction._id).populate('sender' );       

            // only adjust balance if sender and recipient are different accounts
            if (actualRecipient.id !== senderId) {

                // decrease senders money on account
                sender.balance -= transaction.amount;

                await sender.save();

                // increase recipients money on account
                actualRecipient.balance += transaction.amount;

                await actualRecipient.save();

            }

            res.json(result);

            // transaction is successful, send socket.io event containing users id in its name
            socket.emit(`transaction-${actualRecipient._id}`, dataForNotification);

            const { subscriptions } = actualRecipient;

            // send push notification to recipient
            subscriptions.forEach(async subscription => {

                const toSend = {
                    title: 'New Payment',
                    icon: '/logo192.png',
                    body: `You received a new payment from ${sender.name}.`,
                };

                await webpush.sendNotification(subscription, JSON.stringify(toSend));

            });

        } catch (error) {
            res.status(500).json(error);
        }
    });
}

module.exports = sendMoney;