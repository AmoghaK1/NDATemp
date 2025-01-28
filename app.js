const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/NDA_db");
const express = require("express");
const app = express();
port = 7000

app.set("view engine","ejs");
app.use(express.static('./public'));
    


app.get('/',(req,res)=>{
    res.render('comingsoon')
})

app.get('/login',(req,res)=>{
    res.render('login',{name:"Hetavi"})
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.get('/st-dashboard',(req,res)=>{
    res.render('student-dashboard')
})

app.listen(port, ()=>{
    console.log(`Server started on Port ${port}...`);
})

