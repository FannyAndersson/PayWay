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

                req.session.user = user;
                return res.json(user);

            }
            else {
                return res.status(400).json({ error: "Password doesn't match" });
            }
        }

        else {
            return res.status(404).json({ error: "User not found" });
        }
    });

    // check if/which user that is logged in
    app.get('/api/login', async (req, res) => {
        res.json(req.session.user ? req.session.user : false);
    });

}

module.exports = useLogin;