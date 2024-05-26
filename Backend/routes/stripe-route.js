const express = require("express");
const router = express.Router();
const stripe = require("stripe")("sk_test_51P7zHR008C48mjTvu9obnUXsqW4RNo9rV2wigJwjapax1mp4WzWf8iHkoc0Gjv4lrqzzdvWqUtth6HZCJjafmQhF00uzO5Wcmf");

const PaymentModel = require("../models/PaymentModel");
const PaymentController = require("../controllers/PaymentController");

router.get("/", PaymentController.getAllPayments);


// Define a route for saving payment details
//router.post("/", PaymentController.savePaymentDetails);
//const { v4: uuidv4 } = require("uuid");

/*const router = express.Router();

router.get("/",(req,res,next)=>{
    console.log("Get response from Researcher");
    res.json({
        message:"It works"
    });
});


router.post("/pay", (req, res, next) => {
    console.log(req.body);
    console.log("Entered Data:", req.body);
    const { token, amount } = req.body;
    console.log("Token (email):", token);


    

    

    const idempotencyKey = uuidv4(); // Call uuidv4 to generate a unique idempotency key

    return stripe.customers.create({
        email: token.email,
        source: token // Assuming token is the payment token from Stripe
    }).then(customer => {
        return stripe.charges.create({
            amount: amount*100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email
        }, { idempotencyKey });
    }).then(result => {
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while processing the payment.' });
    });
});*/

router.post("/payment", (req, res) => {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
        receipt_email: req.body.email,

      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          res.status(500).json(stripeErr);
        } else {
          res.status(200).json(stripeRes);
        }
      }
    );
  });

  /*router.post("/payment", async (req, res) => {
    try {
        const paymentResponse = await stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
            receipt_email: req.body.email,
        });

        // Extract relevant payment data including status
        const { id: paymentId, status, amount, receipt_email: receiptEmail } = paymentResponse;

        // Save payment data to MongoDB
        await PaymentController.savePayment({ body: { paymentId, status, amount, receiptEmail } });

        // Respond with success message
        return res.status(200).json({ message: "Payment processed successfully" });
    } catch (error) {
        console.error("Error processing payment:", error);
        return res.status(500).json({ message: "An error occurred while processing the payment" });
    }
});*/



  //stripe webhook

 let endpointSecret; 
// This is your Stripe CLI webhook secret for testing your endpoint locally.
// endpointSecret = "whsec_b9b2699274eb096a6d43fd8ba9443346f2d244c7f8753be8159d11264afaae00";

router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    console.log("Webhook received"); // Log that the webhook is received
    const sig = req.headers['stripe-signature'];
    const event = req.body;
    const eventData = req.body;
    
    let data;
    let eventType;

    if(endpointSecret) {
        let stripeEvent;

        try {
            stripeEvent = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            console.log("Webhook verified");
        } catch (err) {
            console.log(`Webhook Error: ${err.message}`);
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        data = stripeEvent.data.object;
        eventType = stripeEvent.type;
    } else {
        data = event;
        eventType = event.type;
    }

    console.log("Event Type:", eventType); 
    console.log("Event Data:", data); 


   

    switch (eventType) {
        case 'charge.succeeded':
          //const { id, amount, status, receipt_email } = data;
          const { id, amount, status, receipt_email } = req.body.data.object;

          // Create a new PaymentModel instance with the extracted data
          const newPayment = new PaymentModel({
            id: id,
            amount: amount,
            status: status,
            receipt_email: receipt_email
          });
          
          // Save the new payment to the database
          try {
            const savedPayment = await newPayment.save();
            console.log("Payment details saved successfully:", savedPayment);
            res.sendStatus(200);
          } catch (error) {
            console.error("Error saving payment details:", error);
            res.status(500).send("Error saving payment details.");
          }

          break;
    }
});


module.exports = router;