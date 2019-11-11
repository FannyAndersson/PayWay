const User = require('../mongoose-models/user.model');
const Transaction = require('../mongoose-models/transaction.model')

function adminBoard (app){
app.get('/api/admin-dashboard', async (req, res)=>{
const user = await req.session.user
if(user&&user.role !== "admin"){
    res.status(400).json('whatcha looking for boi?')
}
if(user.role=== "admin"){
    res.json({user, message: 'Boo yeah'})
}
console.log(user.role, user.name, 'Admin Bae')
})
}


module.exports=adminBoard;