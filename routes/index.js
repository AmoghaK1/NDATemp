// var express = require('express')
// var router = express.Router();
// const userModel = require("./users");


// //creating a schema:
// router.get('/create',async(req,res)=>{
//     const createdUser = await userModel.create({
//         name: "Hetavi",
//         email: "hetavimodi2005@gmail.com",
//         birthdate: 29-9-2005,
//         age: 19,
//         student_ph: 9529623267,
//         examlvl: "Praveshika Purna",
//         mother_ph: 7757916550,
//         father_ph: 9730034309,
//         password: "meIshetavi",
//         cnf_password: "meIshetavi"    
//     })
//     res.send(createdUser);
// })

// //reading schema:
// router.get('/allUser',async(req,res)=>{
//     let allUser = await userModel.find();
//     res.send(allUser);
// })

// module.exports = router;