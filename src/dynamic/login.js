/*
  login.js
  Patient Telecom App
  Wyoming Technology Coronavirus Coalition
*/

/*
  Contains dynamic JavaScript elements for Telecom Web App


  Table of Contents
  =================
  1.) Login Page Initialization
  2.) User Management
    2.a) Register New User
  3.) Authentication
    3.a) Password Authentication
  4.) Button Event Handling
*/


//  2.a) Register New User


/*
  3.) Authentication
*/

/*
  TODO:
    * Password Verifcation
    * Second Factor Authentication
*/



/*
  4.) Button Event Handling
*/

//  Raise Prompt
var buttonRegister = document.getElementById("buttonRegister")
buttonRegister.addEventListener('click', function (e) {
  document.getElementById("formRegister").style.visibility = "visible"
})

var buttonRegisterCancel = document.getElementById("buttonRegisterCancel")
buttonRegisterCancel.addEventListener('click', function (e) {
  document.getElementById("formRegister").style.visibility = "hidden"
})

var buttonRegisterProceed = document.getElementById("buttonRegisterProceed")
buttonRegisterProceed.addEventListener('click', function (e) {
  document.getElementById("formRegister").style.visibility = "hidden"
})


