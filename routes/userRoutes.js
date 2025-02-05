const express = require('express');
const bodyParser = require('body-parser');
const user_route = express();

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended: true}));

const userController = require('../controllers/userController');
const passport = require('passport');
user_route.get('/signup', userController.loadRegister);
user_route.post('/signup', userController.addUser);
user_route.get('/login',userController.loadLogin);
user_route.post('/login',passport.authenticate('local',{
    successRedirect: '/st-dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));
user_route.post('/login',userController.loginUser);

module.exports = user_route;


