const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/NDA_db");
const express = require("express");
const bodyParser = require('body-parser');
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const config = require("./config/config")
const paymentRoutes = require('./routes/payment');


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
    secret: config.session_secret,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }
   
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use((req, res, next) => {
    res.locals.error = req.flash("error"); // Flash messages available in views
    next();
});


const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

app.get('/accounts',(req,res)=>{
    res.render('accounts2');
})

app.listen(port, ()=>{
    console.log(`Server started on Port ${port}`);
})

app.use('/payment',paymentRoutes);
module.exports = app;

