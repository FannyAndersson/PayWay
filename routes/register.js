const User = require('../mongoose-models/user.model');
const sendEmail = require('../send-email');
const encryptPassword = require('../helpers/encrypt-password');

/****
 * User registration
 */

function register(app) {
	app.post('/api/register', async (req, res) => {
		const { phone, email, password } = req.body;

		const user = new User({
			...req.body,
			password: encryptPassword(password)
		});

		//these testEmail and testPhone are created to check duplicate email and phone in db
		//because in-built mongoose check of unique fields doesn't work properly by some reason / bug
		let testEmail = await User.findOne({ email: email });
		if (testEmail && testEmail.email === email) {
			return res.status(500).json({ error: 'email' });
		}

		let testPhone = await User.findOne({ phone: phone });
		if (testPhone && testPhone.phone === phone) {
			return res.status(500).json({ error: 'phone' });
		}
		try {
			await user.save();
		} catch (error) {
			if (error.errmsg.includes('phone')) {
				return res.status(500).json({ error: 'phone' });
			}
			if (error.errmsg.includes('email')) {
				return res.status(500).json({ error: 'email' });
			}
			res.status(500).send(error);
			return;
		}
		res.json({
			message: 'User successfully registered',
			user: user,
			email: user.email
		});

		const link = `http://localhost:3000/activate-account/${user._id}`;
		// const link = `https://paywayapp.se/activate-account/${user._id}`;

		//send email for activation
		sendEmail({
			to: user.email,
			html: `<body><p>Click this link to activate your PayWay account - <a href="${link}" target=_blank title="activate account">Activate account on paywayapp.se</a></p></body>`,
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
			if (user && user.activated) {
				return res.status(500).json({ error: "Your account is already activated. Link is invalid." });
			}
			user.activated = true;
			await user.save();

			//send email after activation

			sendEmail({
				to: user.email,
				html: `<body><p>Your account has been activated!</p></body>`,
				subject: "PayWay -Successfully activated NO REPLY"
			});
			return res.status(200).json({ user });
		} catch (error) {
			res.status(500).json(error);
		}
	});

}
module.exports = register;
