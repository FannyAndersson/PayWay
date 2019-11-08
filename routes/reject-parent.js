const User = require('../mongoose-models/user.model');
const sendRejectMailToParent = require('../send-email.js');

function rejectParent(app) {
    app.post('/api/reject-parent/:id', async(req, res) => {
        const { email } = req.body;

        const child = await User.findOne({ email });
        const parent = await User.findById(req.params.id);
        console.log(parent, 'parent');

        if (!child) {
            res.status(404).send('Child not found');
        }
        if (!parent) {
            res.status(404).send('Parent not found');
        }

        //Delete child from pending array

        parent.children.pending.splice(
            parent.children.pending.indexOf(child._id),
            1
        );
        parent.save();

        //Check if parent aldready been rejected
        if (parent.children.pending.indexOf(child._id) !== -1) {
            return res.send(`You've aldready reject ${parent.name} as your parent.`)
        }

        //Send mail to parent that child has reject the request

        sendRejectMailToParent({
            to: parent.email,
            html: `${child.name} rejected you as a parent`,
            subject: 'PayWay - You are rejected'
        });

        res.send(`You rejected ${parent.name} as your parent.`);

        res.status(200).end();
    });
}

module.exports = rejectParent;