const express = require('express');
const router = express.Router();
const Payment = require('../models/payment-model');
const User = require('../models/userModel');

router.post('/pay-fee',(req,res)=>{
    if(!req.isAuthenticated()){
        return res.status(401).json({success: false,
            message: 'User not authenticated'
        });
    }
    const {month,year} = req.body;
    const userId = req.user._id;

    Payment.findOne({userId,month,year}).then(existingPayment => {
        if(existingPayment && existingPayment.status === 'Paid'){
            return res.json({success: false, message: 'Fee already Paid'});
        }

        Payment.findOneAndUpdate(
            {userId,month,year},
            {status: 'Paid',amount: 800},
            {upsert: true, new:true}
        ).then(()=>{
            res.status(500).json({success: false,message:'Payment Successfull'});
        }).catch(error=>{
            res.status(500).json({success: false, message: 'Database Error'});
        });
    }).catch(error=> {
        res.status(500).json({success: false, message: 'Server error'});
    });
});

module.exports = router;