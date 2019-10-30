const User = require("../mongoose-models/user.model");

function exampleRoutes(app, db) {
	app.get("/chicken", (req, res) => {
		res.json("chicken");
	});

	app.get("/api/route-with-param/:id", (req, res) => {
		res.json(req.params.id);
	});

	app.put("/api/profile/:id", async (req, res) => {
		let user = await User.findOne({ _id: req.params.id });
		// if (user === req.session.user) {
		if (user) {
			let result = await User.updateOne({ _id: req.params.id }, req.body);
			res.json(await User.findOne({ _id: req.params.id }));
		} else {
			res.json({ error: "Another user logged in" });
		}
	});
}

module.exports = exampleRoutes;
