const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/NDA_db");
const express = require("express");
const bodyParser = require('body-parser');

const session = require("express-session");
const passport = require("passport");
require("./config/passport")(passport);

const app = express();
port = 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var path = require('path');

//view engine setup
app.set('views' , path.join(__dirname, 'views'));
app.set("view engine","ejs");

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret:" haodaildalkdn",
    cookie: { secure: false }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

app.get('/st-dashboard',(req,res)=>{
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    res.render('student-dashboard');
    
 })

app.listen(port, ()=>{
    console.log(`Server started on Port ${port}`);
})

module.exports = app;

