const User = require("../mongoose-models/user.model");

function updateUser(app) {
	app.put("/api/profile/:id", async (req, res) => {
		let user = await User.findOne({ _id: req.params.id });
		if (
			(user && String(user._id) === req.session.user._id) ||
			req.session.user.role === "admin"
		) {
			try {
				await User.updateOne({ _id: req.params.id }, req.body);
			} catch (error) {
				if(error.errmsg.includes('phone')) {
					return res.status(500).send({error: 'phone'});
				}
				if(error.errmsg.includes('email')) {
					return res.status(500).send({error: 'email'});
				}
				return res.status(500).send(error);
			}
			
			const updatedUser = await User.findOne({ _id: req.params.id });
			res.status(200).json(updatedUser);
			req.session.user = updatedUser;
			req.session.save(function(err) {
				if(err) {
					throw error(err);
				}
			});
		} else {
			res.json({ error: "Another user logged in" });
		}
	});
}

module.exports = updateUser;
