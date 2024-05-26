const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    amountSpent: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model("ExpenseModel", expenseSchema);
