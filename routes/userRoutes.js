const express = require('express');
const bodyParser = require('body-parser');
const user_route = express();
const config = require("../config/config")
const auth = require('../middlewares/auth');


user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended: true}));

const userController = require('../controllers/userController');
const passport = require('passport');

user_route.get('/', userController.loadComingsoon);
user_route.post('/enrolled', userController.enrollUser);
user_route.get('/enrolled', userController.loadEnrolledPage);

user_route.get('/signup',auth.redirectIfAuthenticated, userController.loadRegister);
user_route.post('/signup', userController.addUser);
user_route.get('/login',auth.redirectIfAuthenticated, userController.loadLogin);
user_route.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.error("Passport Error:", err);
            return next(err);
        }
        if (!user) {
            console.log("Authentication Failed:", info);
            return res.render("login", { error: info.message, success: null });
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
user_route.get('/st-dashboard', auth.ensureAuthenticated, userController.load_stDashboard);
user_route.get('/logout', userController.logout_user);
user_route.get('/st-profile', auth.ensureAuthenticated, userController.loadProfile);
user_route.put('/api/profile/update', auth.ensureAuthenticated, userController.updateProfile);
user_route.post('/api/profile/update-picture', auth.ensureAuthenticated, userController.updateProfilePicture);
user_route.post('/api/profile/change-password', auth.ensureAuthenticated, userController.changePassword);
user_route.get('/contactus', userController.loadContactUs);

module.exports = user_route;