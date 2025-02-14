const User = require('../models/userModel');
const session = require('express-session');

const bcrypt = require('bcrypt');
const loadRegister = async(req,res)=> {
    try {
        res.render('signup', { error: null, formData: {} }); // Always pass an empty formData object
    } catch (error) {
        console.log(error.message);
    }

}

const addUser = async (req, res) => {
    try {
        // Check if passwords match
        if (req.body.password !== req.body.confirmPassword) {
            return res.render('signup', {
                error: "Passwords don't match",
                formData: req.body
            });
        }

        // Validate Email Format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.email)) {
            return res.render('signup', {
                error: "Invalid email format",
                formData: req.body
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.render('signup', {
                error: "Email already registered",
                formData: req.body
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            birthdate: req.body.birthdate,
            age: req.body.age,
            student_ph_no: req.body.student_ph_no,
            exam_level: req.body.exam_level,
            mother_ph_no: req.body.mother_ph_no,
            father_ph_no: req.body.father_ph_no,
            password: hashedPassword,
            is_admin: 0
        });

        const userData = await user.save();
        if (userData) {
            res.render('login', { success: "Registration successful! Please login." });
        } else {
            res.render('signup', {
                error: "Error occurred while registering",
                formData: req.body
            });
        }
    } catch (error) {
        console.error("Registration error:", error);
        res.render('signup', {
            error: "Something went wrong. Try again later.",
            formData: req.body
        });
    }
};


const loadLogin = async(req,res) => {
    res.render('login', { error: null, success: null }); // Ensures both variables are always defined
};

const load_stDashboard = async(req,res)=>{
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/login');
        }
        
        res.render('student-dashboard', {
            user: req.user // Pass the logged-in user data to the view
        });
    } catch (error) {
        console.log(error.message);
        res.redirect('/login');
    }
}

const logout_user = async(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }

        req.session.regenerate((err) => {
            if (err) return next(err);

            res.clearCookie('connect.sid'); // Clear session cookie
            res.redirect('/login'); // Redirect user
        });
    });
}

const loadProfile = async(req,res) => {
    res.render('student-profile')
}

module.exports = {
    loadRegister,
    addUser,
    loadLogin,
    load_stDashboard,
    logout_user,
    loadProfile
};