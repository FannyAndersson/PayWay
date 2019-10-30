module.exports = ({ expect, response, assert, store }) => ({
	path: "users",
	method: "get",
	test() {
        expect( response.nonJSON ).to.not.equal( 'Page not found' );
		assert( response.length > 0 );
		

		store.userId = response
		.filter(x=> x.username!== 'Nala')
		.map(x=>x._id)
		if(!store.testUsers){
			store.testUsers = require('./test-users.json.js')
		}
	}
});
