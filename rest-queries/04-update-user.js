module.exports = ({ expect, response, store, req, assert }) => ({
	path: "profile/5dbc3e048e367e72fc8b8109",
	method: "put",
	body: {
		name: "Muffin",
		activated: true,
		email: "muffin@gmail.com"
	},
	test() {
		expect(response.error).to.not.equal("Another user logged in");
		expect(response._id).to.equal(store.user);
		expect(response.activated).to.equal(true);
		expect(response.statusCode).to.equal(200);
	}
});
