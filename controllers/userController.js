const User = require('../models/userModel');
const bcrypt = require("bcryptjs");

//load register page
const loadRegister = async(req,res)=> {
   res.render('signup');
}

const addUser = async(req,res) => {
    try {

       const existingUser = await User.findOne({email: req.body.email});
       if(existingUser){
        return res.send("Email Already In Use");
       }

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            birthdate: req.body.birthdate,
            age: req.body.age,
            student_ph_no: req.body.student_ph_no,  // Now matches form
            exam_level: req.body.exam_level,        // Now matches form
            mother_ph_no: req.body.mother_ph_no,    // Now matches form
            father_ph_no: req.body.father_ph_no,    // Now matches form
            password: req.body.password,
            is_admin: 0
        });
        await user.save();
        res.redirect('/student-dashboard');

    } catch (error) {
        res.status(500).send("Error Registering User");
    }
};

//profile page
const loadProfile = async(req,res)=>{
    res.render('student-dashboard',{user: req.user});
};

const isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
};

const loadLogin = async(req,res)=>{
    res.render('login');
};

const logout = (req,res)=>{
    req.logout((err)=>{
        if(err) return next(err);
        res.redirect("/");
    });
};
module.exports = {
    loadRegister,
    addUser,
    loadProfile,
    isAuthenticated,
    logout,
    loadLogin
}