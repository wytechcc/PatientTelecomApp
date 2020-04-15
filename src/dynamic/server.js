/*
  server.js
  Isolated Patient Telecom App
  Wyoming Technology Coronavirus Coalition
*/

/*
  This module is executed exactly once

  1.) Config
  2.) WebRTC
  3.) MongoDB
    3.a) MongoDB Initialization
    3.b) User Management
*/


/* 
  Base code for server taken from: https://github.com/shanet/WebRTC-Example/blob/master/server/server.js
*/

//  Default Port
const HTTPS_PORT = 3001;

const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;


const serverConfig = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

// ----------------------------------------------------------------------------------------

// Create a server for the client html page
const handleRequest = function(request, response) {
  // Render the single client html file for any request the HTTP server receives
  console.log('request received: ' + request.url);

    //  Main CSS
  if(request.url == '/style/main.css') {
    response.writeHead(200, {'Content-Type': 'text/css'})
    response.end(fs.readFileSync('src/style/main.css'))
    //  Login Page
  } else if(request.url === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(fs.readFileSync('src/login.html'))
  } else if(request.url === '/dynamic/login.js') {
    response.writeHead(200, {'Content-Type': 'application/javascript'})
    response.end(fs.readFileSync('src/dynamic/login.js'))
  } else if (request.url == '/style/login.css') {
    response.writeHead(200, {'Content-Type': 'text/css'})
    response.end(fs.readFileSync('src/style/login.css'))
    //  Client Pages
    //  Patient
  } else if (request.url == '/client.html?user_type=patient') {
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(fs.readFileSync('src/patient.html'))
  } else if (request.url == '/dynamic/patient.js') {
    response.writeHead(200, {'Content-Type': 'application/javascript'})
    response.end(fs.readFileSync('src/dynamic/patient.js'))
  } else if (request.url == '/style/patient.css') {
    response.writeHead(200, {'Content-Type': 'text/css'})
    response.end(fs.readFileSync('src/style/patient.css'))
    //  Volunteer
  } else if (request.url == '/client.html?user_type=volunteer') {
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(fs.readFileSync('src/volunteer.html'))
  } else if (request.url == '/dynamic/volunteer.js') {
    response.writeHead(200, {'Content-Type': 'application/javascript'})
    response.end(fs.readFileSync('src/dynamic/volunteer.js'))
  } else if (request.url == '/style/volunteer.css') {
    response.writeHead(200, {'Content-Type': 'text/css'})
    response.end(fs.readFileSync('src/style/volunteer.css'))
  }

};

/* hostAppServer()
      Opens Port for Video Channels
*/
  const httpsServer = https.createServer(serverConfig, handleRequest);
  httpsServer.listen(HTTPS_PORT, '0.0.0.0');

// ----------------------------------------------------------------------------------------

// Create a server for handling websocket calls
const wss = new WebSocketServer({server: httpsServer});

wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    // Broadcast any received message to all clients
    console.log('received: %s', message);
    wss.broadcast(message);
  });
});

wss.broadcast = function(data) {
  this.clients.forEach(function(client) {
    if(client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

console.log('Server running. Visit https://localhost:' + HTTPS_PORT + ' in Firefox/Chrome.\n\n\
Some important notes:\n\
  * Note the HTTPS; there is no HTTP -> HTTPS redirect.\n\
  * You\'ll also need to accept the invalid TLS certificate.\n\
  * Some browsers or OSs may not allow the webcam to be used by multiple pages at once. You may need to use two different browsers or machines.\n'
);



/* 
  3.) MongoDB

    This app uses a locally-stored Mongo Database for maintaining user credentials.
    The "name"--"collection" for database access is: "_userDB"--"users"
*/


// app imports
//  Express (App)
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const app = express()
const path = require('path');

//  Mongo (Database)
const mongoDB = require('mongodb')
const mongoose = require('mongoose')
const mongooseValidator = require('mongoose-unique-validator');

//  Passport (Authentication)


/* 
  3.a) MongoDB Initialization
*/

//  Connect to Mongoose Server (Database)
mongoose.connect('mongodb://localhost/_userDB', {useNewUrlParser: true});
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() 
{
  // we're connected!
  console.log("Successfully Connected to Database")
});


//  User Types
const user_type =
{
  USER_PATIENT: 1,
  USER_VOLUNTEER: 2
}

//  site_user is the default item in the app's database
var site_user = new mongoose.Schema
({
  username : String,
  password_hash : String,
  email: {
   type: String,
   required: true,
   unique: true
   },
  usertype : Number
})

//  Add unique ID validator to user obj
site_user.plugin(mongooseValidator)

//  Create a hash from a password
site_user.virtual('password')
 .get(function() {
  return this.passwordHash;
 })
 .set(function(pass) {
  this._password = pass;
  this.passwordHash = bcrypt.hashSync(pass, 8);
 })
 
 site_user.path('password_hash').validate(function(pass) {
 if (this._password.length < 3) {
  this.invalidate('password', 'Password must be at least 8 characters');
 }
})

site_user.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password_hash)
 }
 site_user.pre('save', function(next) {
  // Allows us to just pass the form body directly to the model
  // and removes any properties that don't match the schema.
  for (prop in this) {
   if (!site_user.obj.hasOwnProperty(prop)) continue
   delete this[prop]
  }
  next()
 })


var SiteUser = mongoose.model('SiteUser', site_user)


/*
 Server-Side Response for clients registering to the app
*/
function registerNewUser(uname, passwd, _email, utype)
{
  var usr = new SiteUser({username: uname, password_hash: passwd, email: _email, usertype: utype})
  db.collection("users").insertOne(usr)
}

//  This is called when server is started as a test
//    TODO: the 'register' button at the login page should make RPC requests to registerNewUser() w/ form data
registerNewUser("test user", "test password", "example@gmail.com", user_type.USER_VOLUNTEER)

/* 
  3.b) User Management
*/

//  Add Test User to Database
//db.collection("users").insertOne(test_user, session)

// module.exports = test_user




