//// SCRIPT FOR SIGN UP PAGE ////

/* Main process happened in sign up page:
1. Check if the initial password and reconfirmation password is match
2. Save Avatar photo in public folder 
    -- for this project, image avatar.png is set as default
    -- if customer didn't upload new data, this avatar.png will be used as their avatar.
3. Save all user data in db/user_data.json file 
    -- for this project, some user data has already given, so function will only append new data
*/



// import data
const fs = require('fs');
const {resolve} = require('path');


// get user_data.json file
const filePath = resolve(); 
const userDataJSON = require(filePath + '/db/user_data.json')


// function to check password reconfirmation match  
function checkPassword(fields) {
    const initPassword = fields.initialPassword
    const recfmPassword = fields.reconfirmPassword

    if (initPassword === recfmPassword) {
        return true
    } else {
        return false
    }
}



// function to get file name of avatar photo from user --> save to public folder
function saveAvatar(files) { 
    filetype = files.avatar.mimetype
    if (filetype.substring(0, 5) === "image") {    // condition if customer upload new image
        // get the image path
        const oldPath = files.avatar.filepath ;
        const newPath = filePath + '/public/' + files.avatar.newFilename + '.png'

        // save the image in the local
        fs.copyFile(oldPath, newPath, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Image saved on public folder")
            }
        })

        return files.avatar.newFilename + '.png'
    } else {     // condition if customer do not upload new image
        return 'avatar.png'
    }
    
}


// function to get registration data input from user --> append to user_data.json
function saveUserData(fields, imageFileName) {

    const id = userDataJSON.length + 1
    
    userDataJSON.push({
            id: id, 
            username: fields.username, 
            email: fields.email,
            password: fields.initialPassword,
            imageFileName : imageFileName
        }) 
    
    fs.writeFileSync(filePath + '/db/user_data.json', JSON.stringify(userDataJSON))
}


// export modules
module.exports = {
    checkPassword,
    saveAvatar,
    saveUserData
}

