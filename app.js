// Require the express module
const path = require( 'path' );
const express = require( 'express' );
const Sass = require( './sass' );
const config = require( './config.json' );
const mongoose = require( 'mongoose' );
const theRest = require( 'the.rest' );


// Connect to MongoDB via Mongoose
mongoose.connect( 'mongodb+srv://dbAdmin:dbpassword@paywaydb-lsbwf.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
} );

// Create a new web server
const app = express();

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
// Tell the web server to serve files
// from the www folder
app.use( express.static( 'public' ) );
// Start the web server on port 3000
app.listen( 3001, () => console.log( 'Listening on port 3001' ) );