const User = require('../mongoose-models/user.model')

function createFavorite(app, db) {
    app.post('/api/createFavorite', async (req, res) => {

        const { user } = req.session;
        const currentUser = await User.findById(user._id);


        const favoriteUser = await User.findOne({ phone: req.body.phone })



        if (!currentUser) {
            return res.status(404).json({ error: "User not found" });
        }


        if (!favoriteUser) {
            return res.status(404).json({ error: "No such user" });
        }

        //checking if user exists in favorites
        if (currentUser.favorites.includes(favoriteUser._id)) {
            res.send("Request has already been sent to this user")
        } else {
            currentUser.favorites.push(favoriteUser);
            currentUser.save();
            res.send("sent");

            res.status(200).end();

        }

    })
}

module.exports = createFavorite;
