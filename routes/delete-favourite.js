const User = require('../mongoose-models/user.model');

function deleteFavourite(app) {
    app.post('api/delete-favourite/:id', async (req, res) => {
        const { user } = req.session;

        if (!user) {
            return res.status(400).send('logg in to remove your favourite contact');
        }
        try {
            const favToDelete = await User.findById(req.params.id);
            const currentUser = await user.findById(user._id);

            if (!favToDelete) {
                return res.status(400).send('you dont have such favourite with that id in database');
            }
            if (currentUser.favourites.includes(favToDelete._id)) {
                currentUser.favourites.splice(currentUser.favourites.indexOf(favToDelete._id), 1);
                currentUser.save();

                return res.status(200).send('You have just removed one of your favourites with a phone no: ${favToDelete.phone}')
            }
            else {
                return res.status(400).send('You have not such favourite with such phone')
            }
        }
         catch (error) {
             return res.status(500).json(error);

         }  
    });

}

module.exports = deleteFavourite;