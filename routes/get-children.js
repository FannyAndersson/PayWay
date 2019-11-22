const User = require('../mongoose-models/user.model');

function getChildren(app) {
    app.get('/api/users/:id/children', async (req, res) => {
        const { user } = req.session;
        if (!user) {
            return res.status(400).send('You must be logged in!');
        }

        try {
            const currentUser = await User.findById(user._id).populate({
                path: 'children',
                populate: {
                    path: "pending",

                    model: "User",
                    select: 'name phone',

                }
            });
            console.log(currentUser, "current");
            res.json(
                currentUser
            )
        } catch (error) {
            res.status(500).send(error)
        }
    })
}


module.exports = getChildren;