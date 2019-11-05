const User = require('../mongoose-models/user.model');
const sendMail = require('../send-email.js');

function confirmParent(app) {
    app.post('/api/confirm-parent/:id', async (req, res) => {
        const { email } = req.body;
        const child = await User.findOne({ email });
        const parent = await User.findById(req.params.id);
        if(!child) {
            res.status(404).send('User not found');
        }
        if(!parent) {
            res.status(404).send('Parent not found');
        }

        //if parent end child exists remove child from pending
        parent.children.pending.splice(
            parent.children.pending.indexOf(child._id), 1
        );

        //check if child has been already added to confirmed
        //return message that parent has been already confirmed
        if(parent.children.confirmed.indexOf(child._id) !== -1) {
           return res.send(`You have already confirmed ${parent.name} as your parent. Link is invalid.`) 
        }

        //add child to confirmed array
        parent.children.confirmed.push(child);
        parent.save();

        const linkToTransactions = `http://localhost:3000/api/child-transactions/${child._id}`;
        //send mail to parent about confirmation
        sendMail({
            to: parent.email,
            html: `<body><p>${child.name} with phone number ${child.phone} confirmed you as parent.</p>
            <p>Click <a href="${linkToTransactions}" target="_blank">here</a> to see ${child.name}'s transaction.</p></body>`,
            subject: "PayWay -  You are parent finally! NO REPLY"
        });

        //send message to frontend about success
        res.send(`You confirmed ${parent.name} as your parent.`);

        res.status(200).end();
    });
}

module.exports = confirmParent;