const User = require("../mongoose-models/user.model");
const sendEmail = require("../send-email");
const encryptPassword = require('../helpers/encrypt-password');

function resetPassword(app) {
	// this is the route a user can call when they have forgotten their password
	// and wish to get a link they can click to get a new password
	app.post("/api/reset-password", async (req, res) => {
		// get mail from request body
		const { email } = req.body;

		// find user with email
		const user = await User.findOne({ email });

		// if no user, notify the frontend
		if (!user) {
			return res.status(404).send("no such user");
		}

		// generate the users reset link (to the endpoint we create below)
		const link = `http://localhost:3000/api/reset-password/${user._id}`;

		// send email to the user with the password reset link
		sendEmail({
			to: user.email,
			html: `<body><p>Click this link to get a new password - ${link}</p></body>`,
			subject: "PayWay - Reset Password NO REPLY"
		});

		// respond with status 200 (ok) to let frontend know that it was successful
		res.status(200).end();
	});

	// this is the link that is sent out
	// when this 'endpoint' is 'hit' the users password should be set
	// to something random, and an email with this new password
	// send to the user
	app.get("/api/reset-password/:id", async (req, res) => {
		// get a password (it's not really unique, but it should be 'unique enough' for our purposes)
		const password = generateUniquePassword();

		try {
			// get the user
			const user = await User.findById(req.params.id);

			// change the password (encrypt before saving)
			user.password = encryptPassword(password);
			await user.save();

			// notify the user with mail (send them the unencrypted pwd)
			sendMailWithNewPassword(user.email, password);

			res.send(
				"We have sent an email to you containing your new password. You can now use this password to login."
			);
		} catch (error) {
			// respond with status 500 (internal server error) to let frontend know there was an error when processing
			// the request. Also send error obj as response.
			res.status(500).json(error);
		}
	});
}

function generateUniquePassword() {
	return String(Math.random());
}

function sendMailWithNewPassword(email, password) {
	sendEmail({
		to: email,
		subject: "PayWay - New password",
		html: `<body><p>Hi! Your new password is ${password}. You can now use your new password to log into PayWay. We recommend that you change this password to something more fun and perhaps a bit naughty (but only if you feel like it).`
	});
}

module.exports = resetPassword;
