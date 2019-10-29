module.exports = ({ expect, response }) => ({
	path: "login",
	method: "post",
	body: {
		name: "Nala",
		password: "23456"
	},
	test() {
		expect(response.name).to.equal("Nala");
	}
});
