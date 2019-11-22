const User = require('../mongoose-models/user.model');

// get a user's transactions 
function getUserTransactions(app) {
    app.get('/api/users/:id/transactions', async (req, res) => {
        const { user } = await req.session;
        // const user = await User.findById("5dcea6d8a51e1b38d0c53e45")
        console.log(user);
        console.log(req.params.id, "id");
        if (!user) {
            return res.status(400).json('Make sure to login, please');
        }
        try {
            const myMonies = await User.findById(req.params.id).populate({
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

            // })
            // console.log(myMonies, 'making money move')
            // console.log(myMonies.balance, 'my balance')
            //req.params.id in findbyid
            console.log(myMonies);

            // if (user._id != "5dcea6d8a51e1b38d0c53e45") {
            if (user._id !== req.params.id) {
                return res.status(400).json('Are you sure you are logged in?')
            } else {
                res.json({

                    incomingTransactions: myMonies.incomingTransactions,
                    outgoingTransactions: myMonies.outgoingTransactions,
                    message: 'making money move'
                })
            }
        } catch (error) {
            res.status(500).send(error)
        }
    })
}



module.exports = getUserTransactions;