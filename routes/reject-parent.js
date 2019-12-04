const User = require('../mongoose-models/user.model');
const sendRejectMailToParent = require('../send-email.js');


function rejectParent(app) {
    app.get('/api/child/reject-parent/:id', async (req, res) => {

        let params = req.params.id;
        let parentID = params.slice(0, 24);
        let childID = params.slice(24, 49);


        const child = await User.findById(childID);
        const parent = await User.findById(parentID);


        try {

            if (!child) {
                return res.status(404).json({ error: 'Child not found' });
            }
            if (!parent) {
                return res.status(404).json({ error: 'Parent not found' });
            }
            if (String(child._id) === req.params.id) {
                return res
                    .status(404)
                    .json({ error: `You can\'t send a request to yourself` });
            }

            //Check if parent aldready been rejected
            if (!parent.children.pending.includes(child._id)) {
                return res.json({ error: `You've already rejected ${parent.name} as your parent.` });
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

            res.json({ message: `You rejected ${parent.name} as your parent.` });

            res.status(200).end();

        } catch (error) {
            res.status(500).send(error);
        }

    });
}

module.exports = rejectParent;