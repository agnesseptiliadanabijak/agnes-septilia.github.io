//// ADDITIONAL: USER DATA JS ////

/* This script is independent from the overall configuration.
The purpose is to work with user data API in POSTMAN with several method.
*/


// import module
const express = require('express');
const {resolve} = require('path');

const Router = express.Router();
const filePath = resolve(); 


// get user data json
Router.use(express.urlencoded({ extended: false}))  
const userdata = require(filePath + '/db/user_data.json')


// === API with GET method to read data
Router.get('/datauser', function(req, res) {
    res.status(200).json(userdata)
})


// Read data with defined id# 
Router.get('/datauser/:id', function(req, res) {

    // check if data has the selected id
    const selectedUserByID = userdata.find(function(value) {
        return value.id === Number(req.params.id)
    })

    // show  result
    if (selectedUserByID !== undefined) {
        res.status(200).json({ status: 'success', data: selectedUserByID})
    } else{
        res.status(404).json({ status: 'failed', error: 'Data not found!'})
    }
})



// === API with POST method to insert data
Router.post('/datauser/post', function(req, res) {
    // fetch data in body
    const newUser = req.body;

    // create new id
    const totalID = userdata.length + 1

    // push new data to existing json
    userdata.push({
        id: totalID, 
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        imageFileName: newUser.imageFileName
    })

    // see updated data
    res.status(200).json({ status: 'success', data: userdata})    
})



// === API with PUT method to change data
Router.put('/datauser/put/:id', function (req, res) {
    // get params that will be changed
    const selectedID = Number(req.params.id)
    const reqBody = req.body

    // find match id
    const selectedUserByID = userdata.find(function(value) {
        return value.id === selectedID
    })

    // for the match id, change the data    
    const updateData = userdata.map(function(value){
        const concatenate = { ...value, ...reqBody}
        return value.id === selectedID ? concatenate : value 
    })

    // see result
    if (selectedUserByID !== undefined) {
        res.status(200).json({ status: 'success', data: updateData[selectedID - 1]})
    } else{
        res.status(404).json({ status: 'failed', error: 'Data not found!'})
    }

})



// === API with DELETE method 
Router.delete('/datauser/delete/:id', function(req, res) {
    // delete assigned data
    const deletedData = userdata.filter(function(value) {
        return value.id !== Number(req.params.id)
    })

    // show the updated data
    res.status(200).json(deletedData)
})


// export module
module.exports = Router

