module.exports = ({ expect, response, store, req, assert }) => ({
	path: "users/5db981ba0da67b4100d07fbe",
	method: "put",
	body: {
		name: "Lena",
		activated: true
	},
	test() {
		expect(response.error).to.not.equal("Another user logged in");
		expect(response[0]._id).to.equal(store.user);
		expect(response[0].name).to.equal("Lena");
		expect(response[0].activated).to.equal(true);
	}
});
