module.exports = ({ expect, response, assert }) => ({
	path: "users",
	method: "post",
	body: {
		name: "Muffin",
		email: "muffin@gmail.se",
		phone: "072978870",
		password: "23456",
		activated: false, 
		role: "user"
	},
	test() {
		// does the server say user created
		expect(response.name).to.equal("Muffin");
		expect(response.phone).to.equal("072978870");
	}
});
