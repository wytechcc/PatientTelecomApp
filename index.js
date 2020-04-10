/*
  index.js
  Patient Telecom App
  Wyoming Technology Coronavirus Coalition
*/

// content of index.js
const express = require('express')
const path = require('path')

const app = express()

const port = 3000;

app.use(express.static(__dirname + '/src'))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/src/index.html'))
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})



