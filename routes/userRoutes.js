const express = require('express');
const user_route = express();

user_route.set('view engine', 'ejs');
user_route.set('viewes', './views/users');
const userController = require('../controllers/userController');
user_route.get('/register', userController.loadRegister);

module.exports = user_route;