const mongoose = require("mongoose");

const EmailsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    }
   
});

module.exports = mongoose.model("Emails", EmailsSchema);
