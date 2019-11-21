const User = require("../mongoose-models/user.model");

function updateUser(app) {
	app.put("/api/profile/:id", async (req, res) => {
		let user = await User.findOne({ _id: req.params.id });
		if (
			(user && String(user._id) === req.session.user._id) ||
			req.session.user.role === "admin"
		) {
			await User.updateOne({ _id: req.params.id }, req.body);
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
