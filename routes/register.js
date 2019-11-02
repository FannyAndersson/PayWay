const User = require('../mongoose-models/user.model');
const crypto = require('crypto')
const salt = 'lussekatter are the best'; // unique secret


function encryptPassword(password){
    return crypto.createHmac('sha256', salt)
    .update(password).digest('hex')
}

function register(app){
    app.post('/api/register', async (req, res)=>{
        // const {name, email, password} = req.body
        let user= await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).send('Email already exists!')
        } else {
            user =  new User({
                ...req.body, 
                password: encryptPassword(req.body.password)
            })
        }
await user.save()
        res.json({
            message: 'User successfully registered', 
            user: user,
            email: user.email
        });
    });

    // route to login
    app.post('/api/login', async (req, res) => {
        let {email, password} = req.body;
        password = encryptPassword(password);
        let user = await User.findOne({email:email})
          .select('name email role').exec();
        if(user){ 
            req.session.user = user 
            // console.log(user, 'loggedIn user')
        };
        res.json(user ? user : {error: 'User not found'});
      });
      
      // check if/which user that is logged in
      app.get('/api/login', async (req, res) => {
          let user = await req.session.user
          console.log(user.role, 'user role?')
        res.json(req.session.user ?
          req.session.user :
          {status: 'Not logged in'}
        );
    });

    // app.delete( '/users/:id', async ( req, res ) => {
    //     let user = await req.session.user
    //     if(user.role !== "admin"){
    //         console.log(user, 'admin?')
    //     return res.status(401).send('For now: only admin allowed') 
        // User.findByIdAndRemove({_id:  req.params.id })
    // }} )
}
module.exports = register;
