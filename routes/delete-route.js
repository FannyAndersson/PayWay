const User = require('../mongoose-models/user.model')

function deleteRoute(app, db) {
// Delete a user by ID
app.delete( '/users/:id', ( req, res ) => {
    User.findByIdAndRemove( req.params.id )
        .then( () => {
            res.status( 200 ).json( {
                message: "User deleted",
                user: req.params.id
            } )
        } )
        .catch( err => res.status( 400 ).json( 'Error: ' + err ) )
} )
}
module.exports= deleteRoute