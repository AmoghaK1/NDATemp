var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/',(req,res)=>{
  res.render('comingsoon')
})

router.get('/login',(req,res)=>{
  res.render('login',{name:"Hetavi"})
})

router.get('/signup',(req,res)=>{
  res.render('signup')
})

router.get('/st-dashboard',(req,res)=>{
  res.render('student-dashboard')
})
module.exports = router;
