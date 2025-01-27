const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/NDA_db");
const express = require("express");
const app = express();
app.use(express.static('./public'));
//for user route
const userRoute = require('./routes/userRoutes');
app.use('/', userRoute);


app.listen(3000, ()=>{
    console.log("Server started on Port 3000...");
   
})

