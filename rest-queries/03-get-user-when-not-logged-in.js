module.exports = ({ expect, response }) => ({
    path: 'login',
    method: 'get',
    test() {
        expect(response.status).to.equal('not logged in');
    }
})