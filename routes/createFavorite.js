const User = require('../mongoose-models/user.model')

function createFavorite(app, db) {
    app.post('/api/createFavorite', async (req, res) => {

        const { user } = req.session;
        let {phone} = req.body;

        if(!user){
            return res.status(404).send({error:"you are not logged in"})
        }

        const currentUser = await User.findById(user._id);
        const favoriteUser = await User.findOne({phone: phone});

        if (!currentUser) {
            return res.status(400).json({ error: "User not found" });
        }

        if (!favoriteUser) {
            console.log(phone, 'phone')
            return res.status(500).json({ error: "No such user with this phone number" });
        }
        
        if(String(favoriteUser._id) === user._id){
            return res.status(404).json('You can not be a favourite to yourself!')
        }
        //checking if user exists in favorites
        if (currentUser.favorites.includes(favoriteUser._id)) {
            return res.status(500).json("Request has already been sent to this user");
        } else {
            currentUser.favorites.push(favoriteUser);
            await currentUser.save();
            res.status(200).json(favoriteUser);
            res.status(200).end();

        }

    })
}

module.exports = createFavorite;
