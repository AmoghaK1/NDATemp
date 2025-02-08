const User = require('../models/userModel');
const session = require('express-session');

const bcrypt = require('bcrypt');
const loadRegister = async(req,res)=> {
    try {
        res.render('signup');
    } catch (error) {
        console.log(error.message);
    }
}

const addUser = async(req,res) => {
    try {
       // Changed to match the form field name
        if(req.body.password !== req.body.confirmPassword) {
            return res.render('signup', { 
                error: "Passwords don't match",
                formData: req.body
            });
        }

        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.render('signup', { 
                error: "Email is already registered. Please use a different one.",
                formData: req.body
    });
}
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);


        const user = new User({
            name: req.body.name,
            email: req.body.email,
            birthdate: req.body.birthdate,
            age: req.body.age,
            student_ph_no: req.body.student_ph_no,  // Now matches form
            exam_level: req.body.exam_level,        // Now matches form
            mother_ph_no: req.body.mother_ph_no,    // Now matches form
            father_ph_no: req.body.father_ph_no,    // Now matches form
            password: hashedPassword,  // Store hashed password
            is_admin: 0
        });
        const userData = await user.save();
        if(userData) {
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
            error: error.message,
            formData: req.body
        });
    }
}

const loadLogin = async(req,res) => {
    res.render('login');
};

const load_stDashboard = async(req,res)=>{
    res.render('student-dashboard');
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


module.exports = {
    loadRegister,
    addUser,
    loadLogin,
    load_stDashboard,
    logout_user
};