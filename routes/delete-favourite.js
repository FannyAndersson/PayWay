const User = require('../mongoose-models/user.model');

function deleteFavourite(app) {
    app.post('/api/delete-favourite/:id', async (req, res) => {
        const { user } = req.session;

        if (!user) {
            return res.status(400).send('log in to remove your favourite contact');
        }
        try {

            const favToDelete = await User.findById(req.params.id);
            const currentUser = await User.findById(user._id);

            if (!favToDelete) {
                return res.status(400).send('you dont have such favourite with that id in database');
            }
            if (currentUser.favorites.includes(favToDelete._id)) {
                currentUser.favorites.splice(currentUser.favorites.indexOf(favToDelete._id), 1);
                await currentUser.save();

                return res.status(200)
            }

        }
        catch (error) {
            return res.status(500).json(error);

        }
    });

}

module.exports = deleteFavourite;