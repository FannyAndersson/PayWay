module.exports = ({ expect, response }) => ({
	path: "login",
	method: "post",
	body: {
		name: "Muffin",
		password: "1111"
	},
	test() {
		expect(response.name).to.equal("Muffin");
		expect(response.role).to.equal("admin");
	}
});
