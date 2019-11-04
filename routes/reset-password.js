const User = require('../mongoose-models/user.model');
const sendEmail = require('../send-email');

function resetPassword(app) {

    // this is the route a user can call when they have forgotten their password
    // and wish to get a link they can click to get a new password
    app.post('/api/reset-password', async (req, res) => {

        // get mail from request body
        const { email } = req.body;

        // find user with email
        const user = await User.findOne({ email });

        // if no user, notify the frontend
        if (!user) {
            return res.status(404).send('no such user');
        }

        const link = `http://localhost:3000/api/reset-password/${user._id}`;

        console.log('link', link);

        sendEmail({
            html: `<body><p>Click this link to get a new password and a free iPad - ${link}</p></body>`,
            subject: 'PayWay - Återställ lösenord',
        });

        res.send(link);

    });

    // this is the link that is sent out
    // when this 'endpoint' is 'hit' the users password should be set
    // to something random, and an email with this new password
    // send to the user
    app.get('/api/reset-password/:id', async (req, res) => {

        console.log('request parameter', req.params.id);

        // get a password
        const password = generateUniquePassword();

        try {
            // get the user
            const user = await User.findById(req.params.id);

            console.log('found user', user);

            res.send('hello');

            // change the password
            user.password = password;
            await user.save();

            // notify the user with mail
            sendMailWithNewPassword(user.email, password);

        } catch (error) {

            res.status(500).send('something went horribly wrong!');

        }

    })

}

function generateUniquePassword() {

    return String(Math.random());
}

function sendMailWithNewPassword(email, password) {

    sendEmail({
        subject: 'Custom subject',
        html: `<body><p>${password} - ${email}`,
    });

}

module.exports = resetPassword;