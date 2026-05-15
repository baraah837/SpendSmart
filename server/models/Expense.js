const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema({
 title: String,
 amount: Number,
 category: String,
 type: String,
 recurring: Boolean,
 date: Date,
 userId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User"
 }
});
module.exports = mongoose.model("Expense", expenseSchema);