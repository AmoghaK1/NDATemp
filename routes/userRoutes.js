const express = require('express');
const bodyParser = require('body-parser');
const user_route = express();

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended: true}));

const userController = require('../controllers/userController');
user_route.get('/signup', userController.loadRegister);
try {
    user_route.post('/signup', userController.addUser);

} catch{
    console.log("Error sending request")
}


module.exports = user_route;


