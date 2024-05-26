// models/PaymentModel.js

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({

    
    id: {
        type: String,
        
    },
    amount: {
        type: Number,
        
    },
    status: {
        type: String,
       
    },
    receipt_email: {
        type: String,
        
    },
   
});

//const PaymentModel = mongoose.model('PaymentModel', paymentSchema);

//module.exports = PaymentModel;

module.exports = mongoose.model(
    "PaymentModel",//file name
    paymentSchema//function name


)
