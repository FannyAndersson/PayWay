module.exports = ({ expect, response, assert }) => ({
	path: "users",
	method: "post",
	body: {
		name: "Aleksandra",
		email: "alex@mail.se",
		phone: "0772293258",
		password: "23456",
		activated: false
	},
	test() {
		// does the server say user created
		expect(response.name).to.equal("Aleksandra");
		expect(response.phone).to.equal("0772293258");
	}
});
