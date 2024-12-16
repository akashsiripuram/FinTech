 // Ensure this is the correct path to your User model

import express from 'express';
import jwt from "jsonwebtoken";
import User from "../model/User.js";
const router = express.Router();

// Middleware to verify token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // Extract token from cookie or authorization header
  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded;  // Attach the decoded user information to the request
    next();
  });
};

// Define the protected route
router.get('/protected-route', verifyToken, async (req, res) => {
  try {
    // Fetch user data from the database, excluding the password field
    const user = await User.findById(req.user.id)
      .select('-password') // Exclude the password field
      .populate('expenses')
      .populate('income')
      .populate('savings');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the full user data (without password) as the response
    res.json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


export default router;
