/*
  login.js
  Patient Telecom App
  Wyoming Technology Coronavirus Coalition
*/

/*
  Contains dynamic JavaScript elements for Telecom Web App


  Table of Contents
  =================
  2.) Authentication
  3.) Register Feature
*/



/*
  1.) Authentication
*/

/*
  TODO:
    * Password Verifcation
    * Second Factor Authentication
*/


/*
  2.) Register Feature
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
