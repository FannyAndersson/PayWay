function logout(app) {

    app.get('/api/logout', (req, res) => {

        const { user } = req.session;

        if (user) {

            req.session.destroy();
            res.status(200).end();

        } else {

            // just give them the 400 bad request if they are not logged in
            res.status(400).end();

        }
    });

}

module.exports = logout;