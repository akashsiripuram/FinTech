import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';



export const registerUser = async (req, res) => {
  const { firstname, lastname, email, phone, username, password } = req.body;
  try {
    const checkUser = await User.findOne({ username });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "username already inuse",
      });
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: "email already inuse",
      });
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
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

//login
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
  
    const user = await User.findOne({ username });
    
   
    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }
    
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.json({
        success: false,
        message: "Wrong password",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        username: user.username,
        fullName: user.fullName,
      },
      "secretkey",
      {
        expiresIn: "7d",
      }
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        username: user.username,
        fullName: user.fullName,
        expenses: user.expenses,
        income: user.income,
        savings: user.savings,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

//logout
export const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//middleware
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};
