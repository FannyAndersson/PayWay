const express = require("express");
// Require the express module
const path = require("path");
const Sass = require("./sass");
const config = require("./config.json");
const mongoose = require("mongoose");
const session = require("express-session");
const connectMongo = require("connect-mongo")(session);
const app = express();
const salt = 'lussekatter are the best'; // unique secret
const http = require('http');

const theRest = require("the.rest");
const port = 3001;
const connectionstring = require("./connectionstring.js");
const useCustomRoutes = require("./routes/index");

// Connect to MongoDB via Mongoose
mongoose
    .connect(connectionstring, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(
        () => {
            global.db = mongoose.connection;
            console.log("db is up & running");
        },
        err => {
            console.log(err);
        }
    );

for (let conf of config.sass) {
    new Sass(conf);
}

// connect middleware
app.use(express.json()); // body parser
app.use(
    session({
        secret: salt, // a unique secret
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // true on htttps server
        store: new connectMongo({ mongooseConnection: mongoose.connection })
    })
);


app.use(express.static("public"));

const server = http.createServer(app);

const io = require('socket.io')(server);

// custom routes
useCustomRoutes(app, io);

if (process.env.NODE_ENV === 'production') {

    // if in production, serve static files of frontend build
    app.use(express.static('frontend/build'));

    // serve index html for all urls as last resort - so it works with the whole SPA things
    app.get('*', (req, res) => {

        response.sendFile(path.resolve(__dirname, 'frontend/build/index.html'));

    })

}

// connect our own acl middleware
const acl = require("./acl");
const aclRules = require("./acl-rules.json");
app.use(acl(aclRules));

// ..and install the.rest as middleware
// Arguments/configuration:
// 1) The express library
// 2) The base route for the REST api to create
// 3) The path to a folder with mongoose-models
//    Please Note: This path must be absolute
const pathToModelFolder = path.join(__dirname, "mongoose-models");
app.use(theRest(express, "/api", pathToModelFolder));

server.listen(port, () => {
    console.log("Server listening on", port);
});