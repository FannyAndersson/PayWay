module.exports = ({response, repeat, store, i, expect})=>({
    path: 'users/' + store.userId[i],
    method: 'delete',
    test(){
        expect(response.deletedCount).to.equal(1)
        if(store.userId[i+1]){
            repeat();
        }
    }
})