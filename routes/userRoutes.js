const express = require('express');
const bodyParser = require('body-parser');
const user_route = express();

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended: true}));

const userController = require('../controllers/userController');
user_route.get('/signup', userController.loadRegister);
user_route.post('/signup', userController.addUser);
user_route.get('/login', userController.loadLogin);

module.exports = user_route;


