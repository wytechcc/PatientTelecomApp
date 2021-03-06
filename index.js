/*
  index.js
  Patient Telecom App
  Wyoming Technology Coronavirus Coalition
*/

/*
  Contains Node.js Server-side Functionality


  Table of Contents
  =================
  1.) Pre-Construction
    1.a) Default Port
    1.b) Subdirectory Access
  2.) Server Initialization
    2.a) Serve Login Page
    2.b) Listen to Socket/Port
*/

// content of index.js
const express = require('express')
const app = express()

const path = require('path')
const http = require("http")
const server = http.createServer(app)
const io = require("socket.io")(server)

/*
  1.) Pre-Construction
*/

//  Default Socket Port (Server)
//  Change to serve on different port
const port = 3000;

//  Give Access to 'src' Directory
app.use(express.static(__dirname + '/src'))

//  Start by serving login page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/src/login.html'))
})

//  Begin listening on default port
app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})



