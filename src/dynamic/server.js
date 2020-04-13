/*
  server.js
  Isolated Patient Telecom App
  Wyoming Technology Coronavirus Coalition
*/

/*
  This module is executed exactly once
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


