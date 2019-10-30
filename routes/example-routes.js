function exampleRoutes(app, db) {
	app.get("/chicken", (req, res) => {
		res.json("chicken");
	});

	app.get("/api/route-with-param/:id", (req, res) => {
		res.json(req.params.id);
	});

	app.put("/api/users/:id", (req, res) => {
		res.json(req.params._id);
		let userId = res.json(req.params._id);
		if (req.session.user._id === userId) {
			res.json(db.find(x => x._id === userId));
		} else {
			res.json("Another user logged in");
		}
	});
}

module.exports = exampleRoutes;
