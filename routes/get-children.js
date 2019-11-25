const User = require('../mongoose-models/user.model');

function getChildren(app) {
    app.get('/api/users/:id/children', async (req, res) => {
        const { user } = req.session;
        if (!user) {
            return res.status(400).send('You must be logged in!');
        }

        try {
            const currentUser = await User.findById(user._id).populate("children", "name phone")
            res.json(
                currentUser.children

            )
        } catch (error) {
            res.status(500).send(error, "errs")
        }
    })
}


module.exports = getChildren;