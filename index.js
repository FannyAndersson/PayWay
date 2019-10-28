const express = require( 'express' );
const app = express();
// Require the express module
const path = require( 'path' );
const Sass = require( './sass' );
const config = require( './config.json' );
const mongoose = require( 'mongoose' );
const theRest = require( 'the.rest' );
const port = 3000;
const connectionstring= require('./connectionstring.js')



// Connect to MongoDB via Mongoose
mongoose.connect(connectionstring , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, 
console.log('db is up & running') );



for ( let conf of config.sass ) {
    new Sass( conf );
}


// ..and install the.rest as middleware
// Arguments/configuration:
// 1) The express library
// 2) The base route for the REST api to create
// 3) The path to a folder with mongoose-models
//    Please Note: This path must be absolute
const pathToModelFolder = path.join( __dirname, 'mongoose-models' );
app.use( theRest( express, '/api', pathToModelFolder ) );

app.use( express.static( 'public' ) );
app.listen( port, () => {
    console.log( 'Server listening on', port );
} );