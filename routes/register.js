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
		try {
			await user.save();
		} catch (error) {
			res.status(500).json(error.message);
			return;
		}
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
		let user = await User.findOne({ email: email});
		if(user){
			if(user.password === password) {
				req.session.user = user;
				return res.json(user);
			}
			else {
				return res.json({ error: "Password doesn't match" });
			}
		}
		else {
			return res.json(user ? user : { error: "User not found" });
		}		
	});

	// check if/which user that is logged in
	app.get('/api/login', async (req, res) => {
		let user = await req.session.user;
		console.log(user.role, "user role?");
		res.json(req.session.user ? req.session.user : { status: "Not logged in" });
	});

	// app.delete( '/users/:id', async ( req, res ) => {
	//     let user = await req.session.user
	//     if(user.role !== "admin"){
	//         console.log(user, 'admin?')
	//     return res.status(401).send('For now: only admin allowed')
	// User.findByIdAndRemove({_id:  req.params.id })
	// }} )
}
module.exports = register;
