const User = require('../mongoose-models/user.model');
const sendEmail = require('../send-email');

function deleteChild(app) {
    app.post('/api/delete-child/:id', async (req, res) => {

        const { user } = req.session;


        if(!user) {
            return res.status(400).send('You must be logged in to delete a child from children\'s list!');
        }

        try {
            // get child from parameter
            const childToDelete = await User.findById(req.params.id);
            const parent = await User.findById(user._id);

            if(!childToDelete) {
                return res.status(400).send(`child with such id doesn't exist in db`);
            }
            if(parent.children.confirmed.includes(childToDelete._id)) {
                parent.children.confirmed.splice(parent.children.confirmed.indexOf(childToDelete._id), 1);
                parent.save();
                sendEmail({
                    to: childToDelete.email,
                    html: `<body><h2>Hello, ${childToDelete.name}!</h2><p>You became an adult! Your parent ${parent.name} successfully deleted you from children and can't watch your transactions anymore!</p></body>`,
                    subject: "PayWay - Deleted from children NO REPLY"
                });
                return res.status(200).send(`You deleted ${childToDelete.name} from your children. You can't watch ${childToDelete.name}'s transactions anymore.`);
            }
            else {
                return res.status(400).send(`This parent has no child with such id in confirmed children`);
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    });
}

module.exports = deleteChild;