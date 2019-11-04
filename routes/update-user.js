const User = require("../mongoose-models/user.model");

function updateUser(app) {
	app.put("/api/profile/:id", async (req, res) => {
		let user = await User.findOne({ _id: req.params.id });
		if (
			(user && String(user._id) === req.session.user._id) ||
			req.session.user.role === "admin"
		) {
			await User.updateOne({ _id: req.params.id }, req.body);
			res.json(await User.findOne({ _id: req.params.id }));
		} else {
			res.json({ error: "Another user logged in" });
		}
	});
}

module.exports = updateUser;
