module.exports = ({ expect, response, store, req, assert }) => ({
	path: "profile/5db981ba0da67b4100d07fbe",
	method: "put",
	body: {
		name: "Lena",
		activated: true,
		email: "lena345@gmail.com"
	},
	test() {
		expect(response.error).to.not.equal("Another user logged in");
		expect(response._id).to.equal(store.user);
		expect(response.activated).to.equal(true);
		expect(response.statusCode).to.equal(200);
	}
});
