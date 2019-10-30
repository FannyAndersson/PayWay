function exampleRoutes(app, db) {

    app.get('/chicken', (req, res) => {

        res.json('chicken');
    })

    app.get('/api/route-with-param/:id', (req, res) => {

        res.json(req.params.id);

    });
}

module.exports = exampleRoutes;