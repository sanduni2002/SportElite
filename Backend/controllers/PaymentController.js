//controllers/PaymentController.js

const PaymentModel = require("../models/PaymentModel");

const getAllPayments = async (req, res, next) => {
    let payments;
    try {
        payments = await PaymentModel.find();
    } catch (err) {
        console.error(err);
       
    }

    if (!payments || payments.length === 0) {
        return res.status(404).json({ message: "Payment data not found" });
    }

    // Display all payment data
    return res.status(200).json({ payments });
};


exports.getAllPayments = getAllPayments;