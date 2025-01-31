const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/NDA_db");
const express = require("express");
var session = require("express-session");
const bodyParser = require('body-parser');

const app = express();
port = 7000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var path = require('path');


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');



//view engine setup
app.set('views' , path.join(__dirname, 'views'));
app.set("view engine","ejs");
app.use(express.static('./public'));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret:" haodaildalkdn"
}))


// app.use('/',indexRouter);
// app.use('/users',usersRouter);

const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);



// app.get('/',(req,res)=>{
//     res.render('comingsoon')
// })

// app.get('/login',(req,res)=>{
//     res.render('login',{name:"Hetavi"})
// })

// app.get('/signup',(req,res)=>{
//     res.render('signup');
// })

// app.get('/st-dashboard',(req,res)=>{
//     res.render('student-dashboard');
// })

// app.get('/tr-dashboard', (req,res)=> {
//     res.render('teacher-dashboard');
// })

app.listen(port, ()=>{
    console.log(`Server started on Port ${port}`);
})


module.exports = app;

