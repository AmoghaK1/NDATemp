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
user_route.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.error("Passport Error:", err);
            return next(err);
        }
        if (!user) {
            console.log("Authentication Failed:", info);
            return res.render("login", { error: info.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error("Login Error:", err);
                return next(err);
            }
            return res.redirect("/st-dashboard");
        });
    })(req, res, next);
});
;
user_route.get('/st-dashboard', userController.load_stDashboard);

module.exports = user_route;