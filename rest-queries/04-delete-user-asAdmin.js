module.exports = ({response, repeat, users, i, expect})=>({
    path: 'users/' + users.userId[i],
    method: 'delete',
    test(){
        expect(response.deletedCount).to.equal(1)
        if(users.userId[i+1]){
            repeat()
        }
    }
})