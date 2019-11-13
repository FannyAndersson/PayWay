const User = require('../mongoose-models/user.model');
const sendEmail = require('../send-email');
const encryptPassword = require('../helpers/encrypt-password');

/****
 * User registration
 */

function register(app) {
	app.post('/api/register', async (req, res) => {
		const {email, password} = req.body;
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).send('Email already exists!');
		} else {
			user = new User({
				...req.body,
				password: encryptPassword(password)
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

}
module.exports = register;
