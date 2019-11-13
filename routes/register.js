const User = require('../mongoose-models/user.model');
const crypto = require('crypto');
const salt = 'lussekatter are the best'; // unique secret
const sendEmail = require('../send-email');

/****
 * Password encryption
 */

function encryptPassword(password) {
	return crypto
		.createHmac('sha256', salt)
		.update(password)
		.digest('hex');
}

/****
 * User registration
 */

function register(app) {
	app.post('/api/register', async (req, res) => {
		// const {name, email, password} = req.body
		let email = req.body.email;
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).send('Email already exists!');
		} else {
			user = new User({
				...req.body,
				password: encryptPassword(req.body.password)
			});
		}
		await user.save();
		res.json({
			message: 'User successfully registered',
			user: user,
			email: user.email
		});

		const link = `http://localhost:3000/api/register/${user._id}`;

		//send email for activation
		sendEmail({
			to: user.email,
			html: `<body><p>Click this link to activate your PayWay account - ${link}</p></body>`,
			subject: "PayWay -Email activation NO REPLY"
		});

		res.status(200).end();
	});

	/****
	 * Account verification
	 */

	app.get('/api/register/:id', async (req, res) => {
		try {
			const user = await User.findById(req.params.id);
			user.activated = true;
			await user.save();

			//send email after activation

			sendEmail({
				to: user.email,
				html: `<body><p>Your account has been activated!</p></body>`,
				subject: "PayWay -Successfully activated NO REPLY"
			});
			res.send("Your account has been activated!");
		} catch (error) {
			res.status(500).json(error);
		}
	});

	/****
	 * Login
	 */

	// route to login
	app.post('/api/login', async (req, res) => {
		let { email, password } = req.body;
		password = encryptPassword(password);
		let user = await User.findOne({ email: email })

			.select("name email role")
			.exec();
		if (user) {
			req.session.user = user;
			// console.log(user, 'loggedIn user')
		}
		res.json(user ? user : { error: "User not found" });
	});

	// check if/which user that is logged in
	app.get('/api/login', async (req, res) => {
		res.json(req.session.user ? req.session.user : { status: "Not logged in" });
	});

}
module.exports = register;
