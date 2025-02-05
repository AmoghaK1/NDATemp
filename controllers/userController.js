const User = require('../models/userModel');
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
        console.log("Received form data:", req.body);

        // Changed to match the form field name
        if(req.body.password !== req.body.confirmPassword) {
            return res.render('signup', { 
                error: "Passwords don't match",
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

        console.log("Created user object:", user);

        const userData = await user.save();
        console.log("Save result:", userData);

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

const loginUser = async(req,res,next)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.render('login',{error : "User Not Found"});
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.render('login',{error:"Incorrect password"});
        }
        
        req.login(user,(err)=>{
            if (err) return next(err);
            return res.redirect('/student-dashboard');
        });
    }catch(error){
        console.error("Login error: ",error);
        res.render('login',{error: "Something went wrong"});
    }
};

const loadLogin = async(req,res) => {
    res.render('login');
};

module.exports = {
    loadRegister,
    addUser,
    loadLogin,
    loginUser
};