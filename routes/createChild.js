const User = require('../mongoose-models/user.model');
const sendMailToChild = require('../send-email.js');

function createChild(app, db) {

    app.post('/api/createchild', async(req, res) => {

        const { user } = req.session;

        const parent = await User.findById(user._id);

        const child = await User.findOne({ phone: req.body.phone });

        //check if request has been already sent to child
        //return message that request has been already sent
        if(parent.children.pending.indexOf(child._id) !== -1) {
            return res.send(`You have already sent request to add ${child.name} as your child. Wait for confirmation. This link is invalid.`) 
         }

        parent.children.pending.push(child);

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

        if (!child) {

            res.status(404).send('Child not found');

        }

    });

}




module.exports = createChild;