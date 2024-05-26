const express = require("express");
const cors = require("cors");
const striperoutes = require("./routes/stripe-route");
const router = require("./routes/PaymentRoutes");
const expenseRoutes = require('./routes/expenseRoutes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/stripe", striperoutes);
app.use("/payments",router);
app.use('/expenses', expenseRoutes);

//mongodb+srv://sanduni:TrNP0tOAcqjDoCEf@cluster0.wkjd4kp.mongodb.net/



mongoose.connect("mongodb+srv://chanithtranchal:chanith@cluster0.kpvenrw.mongodb.net/")
    .then(() => {
        console.log("Connected to MongoDB");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}...`);
        });
    })
    .catch((err) => console.log(err));
