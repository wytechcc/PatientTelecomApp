/*
  users.js
  Isolated Patient App
  Wyoming Technology Coronavirus Coalition
*/


/*
  Contains Structures/Definitions for the various user types
  
  Supported User Types
    * Patient (User in isolation/quarantine or otherwise)
    * Volunteer (User who would normally be visiting in person)
*/


/*
  Patient User Type
    
*/
class UserPatient
{
  constructor(uname)
  {
    this.user_name = uname;
  }
}

/*
  Volunteer User Type

*/
class UserVolunteer
{
  constructor(uname)
  {
    this.user_name = uname;
  }
}





