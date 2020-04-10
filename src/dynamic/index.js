/*
  index.js (HTML Counterpart)
  Patient Telecom App
  Wyoming Technology Coronavirus Coalition
*/

/*
  Contains dynamic JavaScript elements for Telecom Web App


  Table of Contents
  =================
  1.) Navigation
  2.) Authentication
*/


var app = require('express')();

app.use(express.static(__dirname)) //since the index.html and probably pongClient.html are in the current directory based on your code.


/*
  1.) Navigation
*/
const buttonLogin = document.getElementById('buttonLogin')
buttonLogin.addEventListener('click', function(e) {
  // viewed at http://localhost:8080
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/app.html'));
  });
});


function servePage(pageref)
{
  // viewed at http://localhost:8080
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + pageref));
  });
};