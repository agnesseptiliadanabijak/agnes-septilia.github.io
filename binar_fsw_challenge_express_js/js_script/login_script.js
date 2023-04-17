//// SCRIPT FOR LOGIN PAGE ////

/* Main process happened in login page:
1. User authentification --> check if user email and password is available in user_data.json
2. Get authentification result --> based on the result, we will decide the next page for user 
*/


// import module
const fs = require('fs');
const {resolve} = require('path');


// get user_data.json file
const filePath = resolve(); 
const userDataJSON = require(filePath + '/db/user_data.json')


// function to authorize user data in login page 
function loginAuth(array, email, password) {
    let output = "";
    let i = 0;

    // looping to check whether user's email is available 
    do {
        if (output === "success" || output === "wrongPassword") {
            break;
        }
        
        if (array[i].email === email) {
            if (array[i].password === password) {   // "success" if email is found and password is correct
                output = "success"
            } else {
                output = "wrongPassword"    // "wrong password" if email is found but password is incorrect
            }
        } else {
            output = "emailNotFound"    // "email not found" if email is not found in database
        }
        
        i++
    }
    while (i < array.length)
    return { output: output, array: array[i-1] }    
}


// function to get username and avatar image as result
function getUsername(array, email, password) {
    const authResult = loginAuth(array, email, password)
    if (authResult.output === "success") {
        return JSON.stringify({username: authResult.array.username, imageFileName: authResult.array.imageFileName})     // success result will returns username and avatar photo
    } else {
        return authResult.output     // unsuccess result will later used for failed auth information
    }
}


// export module
module.exports = getUsername