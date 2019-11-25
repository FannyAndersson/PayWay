const User = require('../mongoose-models/user.model');
const sendMailToChild = require('../send-email.js');

function createChild(app, db) {

    app.post('/api/createchild', async(req, res) => {

        const { user } = req.session;

        const parent = await User.findById(user._id);

        const child = await User.findOne({ phone: req.body.phone });

        if (!child) {
            return res.status(404).send('User with such phone number is not found');
        }

        if (!parent) {
            return res.status(404).send('Parent is not found');
        }

        if(String(child._id) === user._id){
            return res.status(500).send({error: 'You can not be a child to yourself!', errorCode: 'selfMom'})
        }

        //check if request has been already sent to child
        //return message that request has been already sent
        if (parent.children.pending.indexOf(child._id) !== -1) {
            return res.status(405).send(`You have already sent request to add ${child.name} as your child. Wait for confirmation. This link is invalid.`)
        }

        parent.children.pending.includes(child._id) ? res.send('You have already send a rquest to this user') : parent.children.pending.push(child);

        parent.save();

        const confirmLink = `http://localhost:3000/api/confirm-parent/${parent._id}`;

        const rejectLink = `http://localhost:3000/api/reject-parent/${parent._id}`;

        sendMailToChild({

            to: child.email,
            html: `<body><p>${parent.name} with phone number ${parent.phone} wish to get access to your account- Do you confirm? ${confirmLink} or do you reject? ${rejectLink}</p></body>`,
            subject: "PayWay - Confirm parent NO REPLY"

        });

        //send message to frontend about success
        res.send(`Your request is sent to ${child.name}. Wait for confirmation, please!`);

        res.status(200).end();
    });

}

module.exports = createChild;