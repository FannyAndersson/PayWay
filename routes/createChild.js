const User = require('../mongoose-models/user.model');
const sendMailToChild = require('../send-email.js');

function createChild(app, db) {

    app.post('/api/createchild', async(req, res) => {

        const { user } = req.session;

        const parent = await User.findById(user._id);

        const child = await User.findOne({ phone: req.body.phone })

        parent.children.pending.push(child);

        parent.save();

        const confirmLink = `http://localhost:3000/api/confirm-parent/${parent._id}`;

        const rejectLink = `http://localhost:3000/api/reject-parent/${parent._id}`;

        sendMailToChild({

            to: child.email,
            html: `<body><p>${parent.name} with phone number ${parent.phone} wish to get access to your account- Do you confirm? ${confirmLink} or do you reject? ${rejectLink}</p></body>`,
            subject: "PayWay - Confirm parent NO REPLY"

        })

        res.status(200).end();

        if (!child) {

            res.status(404).send('Child not found');

        }

    });

}




module.exports = createChild;