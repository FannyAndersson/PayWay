const Transaction = require('../mongoose-models/transaction.model');
const User = require('../mongoose-models/user.model');

function getChildReansactions(app) {
    app.get('/api/child-transactions/:id', async (req, res) => {
        const { user } = req.session;

        if (!user) {
            // return statement if there is no logged in user
            return res.status(400).send('You must be logged in to see your children transactions!');
        }

        try {
            const parent = await User.findById(user._id);
            //find child populated with transactions
            const child = await User.findById(req.params.id).populate({
                path: 'incomingTransactions',
                populate: {
                    path: "sender",
                    model: "User"
                }
            }).populate({
                path: 'outgoingTransactions',
                populate: {
                    path: "recipient",
                    model: "User"
                }
            });
            //check if parent has no child with such id
            if (user._id === req.params.id) {
                return res.status(404).send('It is your id, you can\'t be your child!');
            }
            if (parent.children.confirmed.indexOf(req.params.id) === -1) {
                return res.status(404).send('You have no child with such id');
            }
            //return object with transactions
            res.json({
                childName: child.name,
                childPhone: child.phone,
                incomingTransactions: child.incomingTransactions, outgoingTransactions: child.outgoingTransactions
            });
        } catch (error) {
            res.status(500).send(error);
        }
    });
}

module.exports = getChildReansactions;