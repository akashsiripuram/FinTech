import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

let refreshTokens = [];

export const refreshToken = (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) {
        return res.status(401).json("You are not authenticated");
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Invalid refresh token");
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json("Invalid refresh token");
        }

       
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

 
        refreshTokens.push(newRefreshToken);

        // Send new tokens back to the client
        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    });
};
export const registerUser = async (req, res) => {
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

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
};

// Login a user
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);

    res.json({
        username: user.username,
        fullName: user.fullName,  
        accessToken,
        refreshToken,
    });
};

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET);
};
