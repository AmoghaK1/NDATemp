const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
    name : {
        type: String,
        required:true
    },
    email : {
        type: String,
        required:true
    },
    birthdate : {
        type: Date,
        required:true
    },
    age : {
        type: Number,
        required:true
    },
    student_ph_no : {
        type: Number,
        required:true
    },
    exam_level : {
        type: String,
        required:true
    },
    mother_ph_no : {
        type: Number,
        required:true
    },
    father_ph_no : {
        type: Number,
        required:true
    },
    password : {
        type: String,
        required:true
    },
    is_admin : {
        type: Number,
        required:true
    },
    is_verified : {
        type: Number,
        default: 0
    },
    createdAt: {  // Changed from joinDate to createdAt
        type: Date,
        default: Date.now
    },
    profilePicture: {
        type: String,
        default: '../images/pfp_final_1.png'  // Default profile picture
    }
    }, {
    timestamps: true  // This will automatically add createdAt and updatedAt fields
    
});

module.exports = mongoose.model('User', userSchema);



