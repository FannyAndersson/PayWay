const User = require('../mongoose-models/user.model');
const encryptPassword = require('../helpers/encrypt-password');

function useLogin(app) {

    // route to login
    app.post('/api/login', async (req, res) => {

        let { email, password } = req.body;

        password = encryptPassword(password);

        let user = await User.findOne({ email: email });

        if (user) {

            if (user.password === password) {
                if(user.activated) {
                    req.session.user = user;
                    return res.status(200).json(user);
                }
                else {
                    return res.status(400).json({error: "Your account is not activated. Check your mailbox.", errorCode: "inactivated"})
                }
            }
            else {
                return res.status(400).json({ error: "Password doesn't match", errorCode: "wrongPwd" });
            }
        }
        else {
            return res.status(500).json({ error: "User not found", errorCode: "notFound" });
        }
    });

    // check if/which user that is logged in
    app.get('/api/login', async (req, res) => {
        res.json(req.session.user ? req.session.user : false);
    });

}

module.exports = useLogin;