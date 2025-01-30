var express = require('express')
var router = express.Router();
const userModel = require("./users");


//creating a schema:
router.get('/create',async(req,res)=>{
    const createdUser = await userModel.create({
        username: "Hetavi",
        password: "Hetavi123"
    })
    res.send(createdUser);
})

//reading schema:
router.get('/allUser',async(req,res)=>{
    let allUser = await userModel.find();
    res.send(allUser);
})

module.exports = router;