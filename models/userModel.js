const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
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
    }
    
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});


module.exports = mongoose.model('User', userSchema);



