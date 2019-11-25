const User = require('../mongoose-models/user.model');

function adminBoard (app){
app.get('/api/admin-dashboard', async (req, res)=>{
const user = await req.session.user
if (!user || user.role !== "admin") {
    res.status(400).json('whacha looking for boi?')
}
if(user.role === "admin"){
    let users = await User.find().populate('incomingTransactions').populate('outgoingTransactions');
    // let transactions= await Transaction.find()
    res.json({users, message: 'Boo yeah'})
}
})
}


module.exports=adminBoard;