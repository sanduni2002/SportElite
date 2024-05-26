const express = require("express");
const router = express.Router();
//Insert Model
const PaymentModel = require("../models/PaymentModel");
//Inset UserController
const PaymentController = require("../controllers/PaymentController");


router.get("/",PaymentController.getAllPayments);


//export
module.exports = router;