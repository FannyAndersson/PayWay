const Transaction = require('../mongoose-models/transaction.model');
const User = require('../mongoose-models/user.model');

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

            // check that sender has enogugh money
            if (sender.balance < amount) {
                return res.status(400).send('You do not have enough money!');
            }

            // convert phone nr to string just in case
            const actualRecipient = await User.findOne({ phone: String(recipient) });


            if (!actualRecipient) {
                return res.status(404).send('No such user');
            }

            // show me the money
            const transaction = new Transaction({
                recipient: actualRecipient._id,
                sender: sender._id,
                amount,
                message,
            });

            const result = await transaction.save();

            // only adjust balance if sender and recipient are different accounts
            if (actualRecipient.id !== senderId) {

                // decrease senders money on account
                sender.balance -= transaction.amount;

                await sender.save();

                // increase recipients money on account
                actualRecipient.balance += transaction.amount;

                await actualRecipient.save();

            }

            // transaction is successful, send socket.io event containing users id in its name
            socket.emit(`transaction-${actualRecipient._id}`, result);

            res.json(result);

        } catch (error) {
            res.status(500).json(error);
        }
    });
}

module.exports = sendMoney;