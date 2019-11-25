const User = require('../mongoose-models/user.model');


function getFavorites(app) {
    app.get('/api/users/:id/favorites', async (req, res) => {
        const { user } = await req.session;

        if (!user) {
            return res.status(400).json("Please login.")
        }
        try {
            const currentUser = await User.findById(req.params.id).populate("favorites", "name phone")

            if (user._id !== req.params.id) {
                return res.status(400).json("Logged in?")
            } else {
                res.json(
                    currentUser.favorites
                )
            }
        } catch (error) {
            res.status(500).send(error)
        }

    })
}


module.exports = getFavorites;