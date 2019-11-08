const User = require('../mongoose-models/user.model');

// get a user's transactions 
function getUserTransactions(app){
    app.get('/api/users/:id/transactions', async(req, res)=>{
const {user} = await req.session
if(!user){
    return res.status(400).json('You are not logged in');
}
const myMonies = await User.findById(req.params.id).populate('incomingTransactions').populate('outgoingTransactions');
console.log(myMonies, 'making money move')
        res.json({
            incomingTransactions: myMonies.incomingTransactions, 
            outgoingTransactions: myMonies.outgoingTransactions, 
            message: 'making money move'})
    })
}


module.exports = getUserTransactions;