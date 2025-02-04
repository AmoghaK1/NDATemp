const express = require('express');
const bodyParser = require('body-parser');
const user_route = express();
const passport = require("passport");


user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended: true}));

user_route.set('view engine','ejs');
user_route.set('views','./views');

const userController = require('../controllers/userController');
user_route.get('/', userController.loadRegister);
user_route.post('/signup', userController.addUser);
user_route.get('/login',userController.loadLogin);
user_route.post('/login', passport.authenticate("local",{
    successRedirect: "/student-dashboard",
    failureRedirect: "/",
    failureFlash: true
}));

user_route.get("/student-dashboard",userController.isAuthenticated, userController.loadProfile);
user_route.get("/logout",userController.logout);

module.exports = user_route;


