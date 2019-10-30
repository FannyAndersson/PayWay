module.exports = ({ expect, response, store }) => ({
	path: "login",
	method: "post",
	body: {
		name: "Lena",
		password: "11111"
	},
	test() {
		expect(response.name).to.equal("Lena");
		store.user = response._id;
	}
});
