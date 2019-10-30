module.exports = ({ expect, response }) => ({
    path: 'logout',
    method: 'get',
    test() {
        // if logout is successful we get status 200
        expect(response.statusCode).to.equal(200);
    }
})