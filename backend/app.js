import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import  verifyToken  from "./routes/verifyToken.route.js";

import expensesRoutes from "./routes/expenses.routes.js";
import router from "./routes/auth.route.js";
 // Updated to use ES Modules syntax

const app = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true, // Allow cookies to be included
}));


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/finTechDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/api', verifyToken);  // Protected route middleware
app.use("/api/auth", authRoutes);   // Authentication routes
app.use("/api/expenses",expensesRoutes); // Expenses routes

// Start the server
app.listen(3000, () => {
  console.log("Listening on port 3000");
});



// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const mongoose = require("mongoose");
// const User = require("./model/User.js");
// const expenseSchema = require("./model/expenseSchema.js");
// const cors = require("cors");
// const Expense = mongoose.model('Expense', expenseSchema);
// const bodyParser = require("body-parser");
// const verifyTokenRoute=require("./routes/verifyToken.route.js");

// const app = express();
// app.use(bodyParser.json());
// app.use(verifyTokenRoute);

// app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173" }));

// mongoose.connect("mongodb://localhost:27017/newDb", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((error) => {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   });

// const verifyToken = (req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1];
  
//   if (!token) {
//     return res.status(403).json({ message: "Token is required" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid token" });
//     }
//     req.userId = decoded.id;  // Assuming the token contains `id` as `userId`
//     next();
//   });
// };

// // Register Endpoint
// app.post("/api/register", async (req, res) => {
//   try {
//     const { firstname, lastname, email, phone, username, password } = req.body;

//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       firstname,
//       lastname,
//       email,
//       phone,
//       username,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     const token = jwt.sign({ username: newUser.username, id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     res.json({ status: "ok", token });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // Login Endpoint
// app.post("/api/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // Find the user by username
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     // Compare the provided password with the hashed password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

//     // Generate a JWT token
//     const token = jwt.sign(
//       { username: user.username, id: user._id, email: user.email },
//       "secretkey",
//       { expiresIn: "7d" }
//     );

//     res.json({ status: "ok", token });
//   } catch (error) {
//     console.error("Error during login:", error); // Log error
//     res.status(500).json({ message: "Server Error" });
//   }
// });


// // Logout Endpoint
// app.post("/api/logout", (req, res) => {
//   res.clearCookie("refreshToken");  // Clear refresh token cookie if set
//   res.status(200).json({ status: "ok", message: "Logged out successfully" });
// });

// // Transactions Endpoint
// app.post("/api/transactions", verifyToken, async (req, res) => {
//   try {
//     const transactions = await Expense.find({ user: req.userId })  // Fetch transactions for the logged-in user
//       .sort({ date: -1 })
//       .limit(5);

//     if (transactions.length === 0) {
//       return res.status(404).json({ message: "No transactions found" });
//     }
//     console.log("transaction")

//     res.status(200).json(transactions);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "An error occurred while fetching transactions" });
//   }
// });

// app.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });
