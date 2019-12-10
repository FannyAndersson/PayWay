const User = require('../mongoose-models/user.model');
const sendMail = require('../send-email.js');

function confirmParent(app) {
    app.get('/api/child/confirm-parent/:id', async (req, res) => {
        let params = req.params.id;
        let parentID = params.slice(0, 24);
        let childID = params.slice(24, 49);
        const child = await User.findById(childID);
        const parent = await User.findById(parentID);
        if (!child) {
            res.status(404).json({ error: 'User not found' });
        }
        if (!parent) {
            res.status(404).json({ error: 'Parent not found' });
        }

        if (parent) {

            //check if child's id pasted in link
            if (String(child._id) === req.params.id) {
                return res.status(404).json({ error: 'It is your id, you can\'t be your child!' });
            }
            //check if child has been already added to pending
            //return message that didn't send any request
            if (parent.children.pending.indexOf(child._id) === -1) {

                return res.json({ error: "This link has expired" })
                // return res.status(200).json({ parent })
            }

            // if parent and child exists and child is pending, remove child from pending
            parent.children.pending.splice(
                parent.children.pending.indexOf(child._id), 1
            );

            //check if child has been already added to confirmed
            //return message that parent has been already confirmed
            if (parent.children.confirmed.indexOf(child._id) !== -1) {
                return res.json({ error: `You have already confirmed ${parent.name} as your parent. Link is invalid.` })
            }


            //add child to confirmed array
            parent.children.confirmed.push(child);
            parent.save();

            const linkToTransactions = `http://paywayapp.se/api/child-transactions/${child._id}`;
            //send mail to parent about confirmation
            sendMail({
                to: parent.email,
                html: `<body><p>${child.name} with phone number ${child.phone} confirmed you as parent.</p>
                <p>Click <a href="${linkToTransactions}" target="_blank">here</a> to see ${child.name}'s transaction.</p></body>`,
                subject: "PayWay -  You are parent finally! NO REPLY"
            });

            //send message to frontend about success
            res.json({ message: `You confirmed ${parent.name} as your parent.` });
            // res.json({ parent })

            res.status(200).end();
        }

    });
}

module.exports = confirmParent;