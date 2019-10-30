module.exports = ({ expect, response }) => ({
    path: 'logout',
    method: 'get',
    test() {
        // since we are no longer logged in, status should be 400 bad request
        expect(response.statusCode).to.equal(400);
    }
})