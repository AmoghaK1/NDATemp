const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


const userController = require('../controllers/userController');
router.post('/signup',(req,res)=>{
    const userData = userController.req.body;
    res.send(userData);
});
// user_route.get('/signup', userController.loadRegister);
// try {
//     user_route.post('/signup', userController.addUser);

// } catch{
//     console.log("Error sending request")
// }


module.exports = {
    router
}


