// ROUTER MIDDLEWARE FOR REGISTRATION PAGES

/* WORKFLOW
1. User will input their data on sign up page --> data will go through verification process as in signup_script.js
2. From sign up page, user will go to login page to re-input their data.
3. Data from login page will go through verification process as in login_script.js
4. After user finish login, they will go to welcome page, where they can either go back to homepage or play the game.
*/


//import modules
const express = require('express');
const {resolve} = require('path');
const formidable = require('formidable')
const fs = require('fs');


// activate router
const Router = express.Router();


// import modules from js script
const filePath = resolve(); 
const signupModule = require(filePath + '/js_script/signup_script')
const loginModule = require(filePath + '/js_script/login_script')


// use Built-In Middleware to work with url data
Router.use(express.urlencoded({ extended: false}))


// function to send image file as url link --> will be used to show image on welcome page
function takeImagefromURL(filePath) {
    Router.get('/image', function(req, res) {
        const streamReadFile = fs.createReadStream(filePath)
        streamReadFile.pipe(res)
    })
}


// === ROUTING for sign-up page
Router.get('/sign-up', function(req, res) {
    res.sendFile(filePath + '/html_code/signup.html')
})


// === ROUTING for login page if customer came from sign up page
Router.post('/log-in', function(req, res) { 
    const form = formidable({ multiples: true})
    form.parse(req, (err, fields, files) => {
        if (signupModule.checkPassword(fields) === true) {

            // save avatar
            const imageFileName = signupModule.saveAvatar(files)

            // save data
            signupModule.saveUserData(fields, imageFileName)

            // tampilkan halaman login
            res.sendFile(filePath + '/html_code/login.html')

        } else {
            res.status(200).json({info: "authorization failed", error_message: "Retype password is not match with the first one ! "})
        }
    })
})



// === ROUTING for login page if customer directly visit it without going through the sign up page first
Router.get('/log-in', function(req, res) { 
    res.sendFile(filePath + '/html_code/login.html')
})



// === ROUTING for welcome page if customer succeed login 
Router.post('/welcome-page', function(req, res) { 
    const form = formidable({ multiples: true})
    form.parse(req, (err, fields, files) => {
        // take User data that has been updated for new user 
        const newUserData = fs.readFileSync(filePath + '/db/user_data.json')

        // Validate data through email and password combination
        const validUser = loginModule(JSON.parse(newUserData), fields.email, fields.password)
    
        // if email and password match, go to welcome page. Else, send authorization failed page
        if (validUser === "wrongPassword") {
            res.status(200).json({info: "authorization failed", error_message: "Wrong Password, Please try again !"})
        } 
        else if (validUser === "emailNotFound") {
            res.status(200).json({info: "authorization failed", error_message: "Email Not Found, Please sign up !"})
        } 
        else {
            // parse auth result to json
            const validUserJSON = JSON.parse(validUser)

            // create absolute path for avatar image
            const imageFileName = validUserJSON.imageFileName;
            const imageFilePath = filePath + '/public/' + imageFileName

            // convert the image path from local to url link
            try {
                res.render('welcome', {username: validUserJSON.username, photo: takeImagefromURL(imageFilePath)})
            } 
            catch (err) {
                throw err
            }
        }
    })
})


module.exports = Router