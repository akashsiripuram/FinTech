import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";


// Register User
export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      phone,
      username,
      password: hashedPassword,
    });
    console.log(newUser);

    await newUser.save();
    const token = jwt.sign({ username: newUser.username, id: newUser._id, email: newUser.email }, "secretkey", { expiresIn: "7d" });

    res.json({ status: "ok", token, message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ username: user.username, id: user._id, email: user.email }, "secretkey", { expiresIn: "7d" });

    res.cookie("token", token, { httpOnly: true, secure: false }) // Secure can be set to true in production
      .json({ status: "ok", message: "User logged in successfully", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Logout User
export const logoutUser = (req, res) => {
  res.clearCookie("token") // Clear the token cookie
    .json({ message: "User logged out successfully" });
};

// Refresh Token (optional)
export const refreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(403).json({ message: "Access denied, token missing" });
  }

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    
    const newToken = jwt.sign({ username: user.username, id: user.id, email: user.email }, "secretkey", { expiresIn: "7d" });
    res.json({ status: "ok", token: newToken });
  });
};

export const protectedData=async (req, res) => {
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
};
