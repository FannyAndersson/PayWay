const User = require("../mongoose-models/user.model");

function activateAccount(app) {
  //   app.get("/activation", (req, res) => {
  //     res.json("activated");
  //   });
  app.post("/profile", function(req, res, next) {
    let { name, email, password, phone } = req.body;
    let user = new User(req.body);
    user.save();

    res.json("success");
  });
}

function activateAccount(app) {
  //   app.get("/activation", (req, res) => {
  //     res.json("activated");
  //   });
  app.get("/profile", function(req, res, next) {
    let { name, email, password, phone } = req.body;
    let user = User.findOne("");
    let user = new User(req.body);
    user.save();

    res.json("success");
  });
}

module.exports = activateAccount;
