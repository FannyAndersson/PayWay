const User = require('../mongoose-models/user.model');
const sendRejectMailToParent = require('../send-email.js');

function rejectParent(app) {
    app.post('/api/reject-parent/:id', async(req, res) => {
        const { email } = req.body;

        const child = await User.findOne({ email });

        try {
            const parent = await User.findById(req.params.id);

            if (!child) {
                return res.status(404).send('Child not found');
            }
            if (!parent) {
                return res.status(404).send('Parent not found');
            }
            if (String(child._id) === req.params.id) {
                return res
                    .status(404)
                    .send(`You can't be your own child`);
            }

            //Check if parent aldready been rejected
            if (!parent.children.pending.includes(child._id)) {
                return res.send(`You've aldready reject ${parent.name} as your parent.`);
            }

            //Delete child from pending array

            parent.children.pending.splice(parent.children.pending.indexOf(child._id), 1);
            parent.save();

            //Send mail to parent that child has reject the request

            sendRejectMailToParent({
                to: parent.email,
                html: `${child.name} rejected you as a parent`,
                subject: 'PayWay - You are rejected NO REPLY!'
            });

            res.send(`You rejected ${parent.name} as your parent.`);

            res.status(200).end();

        } catch (error) {
            res.status(500).send(error);
        }

    });
}

module.exports = rejectParent;