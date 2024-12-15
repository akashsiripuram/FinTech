const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./model/User.js");
const cors = require("cors");
// const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests only from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    credentials: true,  // If you're using cookies, credentials must be true
  }));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/newDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process on failure
  });

  const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).json({ message: "Token is required" });
    }
  
    jwt.verify(token, "secretkey", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
      req.user = decoded; // Add decoded token to request object
      next();
    });
  };
  
  // Route to get decoded user info
  app.get("/api/verifyToken", verifyToken, (req, res) => {
    res.json({ user: req.user });
  });
  

// Register Endpoint
app.post("/api/register", async (req, res) => {
    try {
      const { firstname, lastname, email, phone, username, password } = req.body;

      console.log("Received data:", req.body); // Debugging line

      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Hashed password:", hashedPassword); // Debugging line

      // Create a new user
      const newUser = new User({
        firstname,
        lastname,
        email,
        phone,
        username,
        password: hashedPassword,
      });

      await newUser.save();
      console.log("New user saved:", newUser); // Debugging line

      // Generate a JWT token
      const token = jwt.sign(
        { username: newUser.username, id: newUser._id, email: newUser.email },
        "secretkey",
        { expiresIn: "7d" }
      );

      res.json({ status: "ok", token });
    } catch (error) {
      console.error("Error during registration:", error); // Debugging line
      res.status(500).json({ message: "Server Error" });
    }
  });

  

// Login Endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate a JWT token
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
        email: user.email,
      },
      "secretkey",
      { expiresIn: "7d" }
    );

    res.json({ status: "ok", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

// Logout Endpoint
app.post("/api/logout", (req, res) => {
    const token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    return res.status(200).json({ status: "ok", message: "Logged out successfully" });
  });

  app.post('/api/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken; // Access from cookies
    if (!refreshToken) return res.status(401).send("Refresh token missing");

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if (err) return res.status(403).send("Invalid refresh token");

        const newAccessToken = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
        res.json({ newAccessToken });
    });
});

  



