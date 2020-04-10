/*
  index.js
  Patient Telecom App
  Wyoming Technology Coronavirus Coalition
*/

// content of index.js
const express = require('express')
const path = require('path')

const app = express()

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



