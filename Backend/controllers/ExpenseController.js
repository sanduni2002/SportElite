const Expense = require("../models/ExpenseModel");

// Get all expenses
const getAllExpenses = async (req, res, next) => {
    let expenses;
    try {
        expenses = await Expense.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
    if (!expenses || expenses.length === 0) {
        return res.status(404).json({ message: "Expenses not found" });
    }
    return res.status(200).json({ expenses });
};

// Add an expense
const addExpense = async (req, res, next) => {
    const { date, description, amountSpent, category, paymentMethod, notes } = req.body;
    let expense;
    try {
        expense = new Expense({ date, description, amountSpent, category, paymentMethod, notes });
        await expense.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ expense });
};

// Get expense by ID
const getExpenseById = async (req, res, next) => {
    const id = req.params.id;
    let expense;
    try {
        expense = await Expense.findById(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
    if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
    }
    return res.status(200).json({ expense });
};

// Update expense details
const updateExpense = async (req, res, next) => {
    const id = req.params.id;
    const { date, description, amountSpent, category, paymentMethod, notes } = req.body;
    let expense;
    try {
        expense = await Expense.findByIdAndUpdate(id, { date, description, amountSpent, category, paymentMethod, notes });
        expense = await expense.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
    if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
    }
    return res.status(200).json({ expense });
};

// Delete an expense
const deleteExpense = async (req, res, next) => {
    const id = req.params.id;
    let expense;
    try {
        expense = await Expense.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
    if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
    }
    return res.status(200).json({ expense });
};

exports.getAllExpenses = getAllExpenses;
exports.addExpense = addExpense;
exports.getExpenseById = getExpenseById;
exports.updateExpense = updateExpense;
exports.deleteExpense = deleteExpense;
