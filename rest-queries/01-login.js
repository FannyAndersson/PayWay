module.exports = ({ expect, response }) => ({
	path: "login",
	method: "post",
	body: {
		name: "Muffin",
		password: "11123"
	},
	test() {
		expect(response.name).to.equal("Muffin");
	}
});
