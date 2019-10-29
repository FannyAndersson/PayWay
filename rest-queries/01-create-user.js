module.exports = ({ expect, response, assert }) => ({
	path: "users",
	method: "post",
	body: {
		name: "Melanie",
		email: "melanie@mail.se",
		phone: "0782293758",
		password: "23456",
		activated: false
	},
	test() {
		// does the server say user created
		expect(response.name).to.equal("Melanie");
		expect(response.phone).to.equal("0782293758");
	}
});
