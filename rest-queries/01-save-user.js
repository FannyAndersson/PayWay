module.exports = ({ expect, response, assert }) => ({
	path: "users",
	method: "post",
	body: {
		"email": "Dormouse",
		"phone": "0737693170",
		"password": "112112",
		"activated": false
	},
	test() {
		// does the server say user created
		expect(response.success).to.equal("User created");
	}
});
