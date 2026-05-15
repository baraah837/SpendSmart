const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("./models/User");
const Expense = require("./models/Expense");
const Review = require("./models/Review");
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
mongoose
 .connect(process.env.MONGO_URI)
 .then(() => {
   console.log("MongoDB Connected");
 })
 .catch((error) => {
   console.log("MongoDB Error:");
   console.log(error);
 });
const JWT_SECRET = process.env.JWT_SECRET || "spendsmart_secret_key";
const protect = (req, res, next) => {
 const token = req.headers.authorization;
 if (!token) {
   return res.status(401).json({ message: "No token provided" });
 }
 try {
   const decoded = jwt.verify(token, JWT_SECRET);
   req.userId = decoded.id;
   next();
 } catch (error) {
   res.status(401).json({ message: "Invalid token" });
 }
};
app.get("/", (req, res) => {
 res.send("SpendSmart Backend is running");
});
/* Register */
app.post("/api/register", async (req, res) => {
 try {
   const { name, email, password, monthlyIncome } = req.body;
   if (!name || !email || !password) {
     return res.status(400).json({ message: "All fields are required" });
   }
   const existingUser = await User.findOne({ email });
   if (existingUser) {
     return res.status(400).json({ message: "Email already exists" });
   }
   const hashedPassword = await bcrypt.hash(password, 10);
   const user = new User({
     name,
     email,
     password: hashedPassword,
     monthlyIncome: Number(monthlyIncome || 0)
   });
   await user.save();
   res.json({ message: "User registered successfully" });
 } catch (error) {
   res.status(500).json({ message: "Register failed" });
 }
});
/* Login */
app.post("/api/login", async (req, res) => {
 try {
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   if (!user) {
     return res.status(400).json({ message: "Invalid email or password" });
   }
   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
     return res.status(400).json({ message: "Invalid email or password" });
   }
   const token = jwt.sign({ id: user._id }, JWT_SECRET, {
     expiresIn: "1d"
   });
   res.json({
     token,
     user: {
       id: user._id,
       name: user.name,
       email: user.email,
       monthlyIncome: user.monthlyIncome,
       profileImage: user.profileImage
     }
   });
 } catch (error) {
   res.status(500).json({ message: "Login failed" });
 }
});
/* Profile */
app.get("/api/profile", protect, async (req, res) => {
 try {
   const user = await User.findById(req.userId).select("-password");
   res.json(user);
 } catch (error) {
   res.status(500).json({ message: "Error getting profile" });
 }
});
app.put("/api/profile", protect, async (req, res) => {
 try {
   const { name, monthlyIncome, profileImage } = req.body;
   const updatedUser = await User.findByIdAndUpdate(
     req.userId,
     {
       name,
       monthlyIncome: Number(monthlyIncome || 0),
       profileImage
     },
     { new: true }
   ).select("-password");
   res.json(updatedUser);
 } catch (error) {
   res.status(500).json({ message: "Error updating profile" });
 }
});
/* Add Expense */
app.post("/api/expenses", protect, async (req, res) => {
 try {
   const expense = new Expense({
     title: req.body.title,
     amount: Number(req.body.amount),
     category: req.body.category,
     type: req.body.type,
     recurring: req.body.recurring,
     date: req.body.date,
     userId: req.userId
   });
   await expense.save();
   res.json(expense);
 } catch (error) {
   res.status(500).json({ message: "Error adding expense" });
 }
});
/* Get User Expenses */
app.get("/api/expenses", protect, async (req, res) => {
 try {
   const expenses = await Expense.find({ userId: req.userId }).sort({
     date: -1
   });
   res.json(expenses);
 } catch (error) {
   res.status(500).json({ message: "Error getting expenses" });
 }
});
/* Get One Expense */
app.get("/api/expenses/:id", protect, async (req, res) => {
 try {
   const expense = await Expense.findOne({
     _id: req.params.id,
     userId: req.userId
   });
   if (!expense) {
     return res.status(404).json({ message: "Expense not found" });
   }
   res.json(expense);
 } catch (error) {
   res.status(500).json({ message: "Error getting expense" });
 }
});
/* Update Expense */
app.put("/api/expenses/:id", protect, async (req, res) => {
 try {
   const updatedExpense = await Expense.findOneAndUpdate(
     {
       _id: req.params.id,
       userId: req.userId
     },
     {
       title: req.body.title,
       amount: Number(req.body.amount),
       category: req.body.category,
       type: req.body.type,
       recurring: req.body.recurring,
       date: req.body.date
     },
     { new: true }
   );
   if (!updatedExpense) {
     return res.status(404).json({ message: "Expense not found" });
   }
   res.json(updatedExpense);
 } catch (error) {
   res.status(500).json({ message: "Error updating expense" });
 }
});
/* Delete Expense */
app.delete("/api/expenses/:id", protect, async (req, res) => {
 try {
   const deletedExpense = await Expense.findOneAndDelete({
     _id: req.params.id,
     userId: req.userId
   });
   if (!deletedExpense) {
     return res.status(404).json({ message: "Expense not found" });
   }
   res.json({ message: "Expense deleted successfully" });
 } catch (error) {
   res.status(500).json({ message: "Error deleting expense" });
 }
});
/* Add Review */
app.post("/api/reviews", protect, async (req, res) => {
 try {
   const { comment, rating } = req.body;
   if (!comment || !rating) {
     return res.status(400).json({
       message: "Comment and rating are required"
     });
   }
   const user = await User.findById(req.userId);
   const review = new Review({
     comment,
     rating: Number(rating),
     userId: req.userId,
     userName: user.name
   });
   await review.save();
   res.json(review);
 } catch (error) {
   res.status(500).json({
     message: "Error adding review"
   });
 }
});
/* Get All Reviews */
app.get("/api/reviews", protect, async (req, res) => {
 try {
   const reviews = await Review.find().sort({
     createdAt: -1
   });
   res.json(reviews);
 } catch (error) {
   res.status(500).json({
     message: "Error getting reviews"
   });
 }
});
/* Delete Own Review */
app.delete("/api/reviews/:id", protect, async (req, res) => {
 try {
   const deletedReview = await Review.findOneAndDelete({
     _id: req.params.id,
     userId: req.userId
   });
   if (!deletedReview) {
     return res.status(404).json({
       message: "Review not found or not allowed"
     });
   }
   res.json({
     message: "Review deleted successfully"
   });
 } catch (error) {
   res.status(500).json({
     message: "Error deleting review"
   });
 }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});