module.exports = ({ expect, response, req, assert }) => ({
	path: "users/5db981ba0da67b4100d07fbe",
	method: "put",
	body: {
		name: "Lena",
		role: "admin"
	},
	test() {
		expect(response.error).to.not.equal("Another user logged in");
		expect(response[0].name).to.equal("Lena");
		expect(response[0].role).to.equal("admin");
	}
});
