module.exports = ({ expect, response }) => ({
	path: "login",
	method: "post",
	body: {
		name: "Lennon",
		password: "11111"
	},
	test() {
		expect(response.name).to.equal("Lennon");
	}
});
