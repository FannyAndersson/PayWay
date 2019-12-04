const User = require("../mongoose-models/user.model");
const encryptPassword = require("../helpers/encrypt-password");

function checkPasswordMatch(app) {
	app.post("/api/check-password", async (req, res) => {
		let { email, password } = req.body;
		password = encryptPassword(password);
		let user = await User.findOne({ email: email });
		if (user) {
			if (user.password === password) {
				return res.status(200).json({success: true});
            }
            else {
                return res.status(500).json({errorCode: 'notMatch'});
            }
        }
        else {
            return res.status(400).json({errorCode: 'notFound'});
        }
	});
}

module.exports = checkPasswordMatch;
