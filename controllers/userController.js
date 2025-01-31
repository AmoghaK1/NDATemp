const User = require('../models/userModel');
const loadRegister = async(req,res)=> {
    try {
        res.render('signup');
    } catch (error) {
        console.log(error.message);
    }
}

const addUser = async(req,res) => {
    try {
        console.log(req.body);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            birthdate: req.body.birthdate,
            age: req.body.age,
            student_ph_no: req.body.student_phone,
            exam_level: req.body.currentExam,
            mother_ph_no: req.body.motherPhone,
            father_ph_no: req.body.fatherPhone,
            password: req.body.password,
            is_admin: 0

        })
    
        const userData = await user.save();
        console.log(userData);
        if(userData){
            res.render('login')
        } else {
            console.message("Error occured while registering");
        }

    } catch(error) {
        console.log(error.message);
    }
}

module.exports = {
    loadRegister,
    addUser

}