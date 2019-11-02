const User = require('../mongoose-models/user.model');
const crypto = require('crypto')
const salt = 'ljusekatter are the best'; // unique secret


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
            message: 'successfully registered', 
            user: user,
            email: user.email
        });
    });

    // route to login
    app.post('/api/login', async (req, res) => {
        let {email, password} = req.body;
        password = encryptPassword(password);
        let user = await User.findOne({email, password})
          .select('name email').exec();
        if(user){ 
            req.session.user = user 
        };
        res.json(user ? user : {error: 'user not found'});
      });
      
      // check if/which user that is logged in
      app.get('/api/login', (req, res) => {
        res.json(req.session.user ?
          req.session.user :
          {status: 'not logged in'}
        );
    });

}
module.exports = register;
