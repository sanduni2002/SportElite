const express = require("express");
const router = express.Router();
// Insert Model
const Expense = require("../models/ExpenseModel");
// Insert ExpenseController
const ExpenseController = require("../controllers/ExpenseController");

router.get("/", ExpenseController.getAllExpenses);
router.post("/", ExpenseController.addExpense);
router.get("/:id", ExpenseController.getExpenseById);
router.put("/:id", ExpenseController.updateExpense);
router.delete("/:id", ExpenseController.deleteExpense);

// Export
module.exports = router;
