const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required:true,
        default: 800
    },
    status:{
        type: String,
        enum: ['Paid','Pending'],
        default: 'Pending'
    }
});

module.exports = mongoose.model('Payment',PaymentSchema);