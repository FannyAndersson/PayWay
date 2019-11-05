const User = require('../mongoose-models/user.model');

function createChild(app, db) {

    app.post('/api/createchild', async(req, res) => {
        let { phone } = req.body;

        console.log(req.body, 'req body')

        const user = await User.findOne({ phone })
            .select('phone').exec();
        console.log('user', user)

        res.send('Check')

        if (!user) {

            res.status(404).send('User not found');

        }

        // if (user) { req.session.user = user };



    });

    app.get('/api/createchild/:id', async(req, res) => {

        try {
            const user = await User.findById(req.params.id);

            console.log('user found', user);

            res.send('user found');

        } catch (error) {

            res.status(500).send('something went wrong');

        }

    });

}


// app.post('/api/profile/:id', async (req, res) => {
//   let user = await User.findOne({ _id: req.params.id });
//   // if (user === req.session.user) {
//   if (user) {
//     let result = await User.updateOne({ _id: req.params.id }, req.body);
//     res.json(await User.findOne({ _id: req.params.id }));
//   } else {
//     res.json({ error: 'Another user logged in' });
//   }
// });


module.exports = createChild;