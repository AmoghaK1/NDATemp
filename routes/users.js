const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/logindata");

// const userSchema = mongoose.Schema({
//     username: String,
//     password: String
// });

const SignupSchema = mongoose.Schema({
    name: String,
    email: String,
    birthdate: Date,
    age: Number,
    student_ph: Number,
    examlvl: String,
    mother_ph: Number,
    father_ph: Number,
    password: String,
    cnf_password: String
})
module.exports = mongoose.model("Signup-User",SignupSchema);
