module.exports = ({ expect, response, assert }) => ({
    path: "login",
    method: "get",
    test() {
        // does the server accept login - in that case it returns user object
        expect(response.name).to.equal("MagnusUggla");
    }
});
