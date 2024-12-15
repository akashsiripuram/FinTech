// const e = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require('cors');
const bcrypt = require("bcrypt");

app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(express.json());



let refreshTokens=[]
app.post("/api/refresh",(req,res)=>{
    const refreshToken=req.body.token;
    if(!refreshToken) return res.status(401).json("You are not authenticated");
    if(!refreshTokens.includes(refreshToken)){
        return res.status(403).json("Invalid refresh token");
    }
    jwt.verify(refreshToken,"myRefreshSecretKey",(err,user)=>{
        err&console.log(err);
        refreshTokens=refreshTokens.filter((token)=>token!==refreshToken);
        const newAccessToken=generateAccessToken(user);
        const newRefreshToken=generateRefreshToken(user);

        refreshTokens.push(newRefreshToken);
        res.status(200).json({
            accessToken:newAccessToken,
            refreshToken:newRefreshToken
        })
    })
})
const generateAccessToken=(user)=>{
    return jwt.sign({ id: user.id }, "secretkey",{expiresIn:7*24*60*60});
}
const generateRefreshToken=(user)=>{
    return jwt.sign({ id: user.id }, "myRefreshSecretKey");
}
app.post("/api/register", async (req, res) => {
    const { firstname,
        lastname,
        email,
        phone,
        username,
        password, } = req.body;

    // Check if user already exists
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the user with the hashed password
    const newUser = { id: String(users.length + 1), username, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: "User registered successfully" });
});
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find((u) => {
    return u.username === username ;
  });
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken=generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.json({
      username: user.username,
      accessToken,
      refreshToken
    });
     
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});
const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, "secretkey", (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Access denied" });
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ message: "Token not provided" });
    }
};
app.delete("/api/users/:id", verify, (req, res) => {
    if (req.user.id === req.params.id) {
        res.status(200).json("User deleted successfully");
    } else {
        res.status(403).json({ message: "Access denied" });
    }
});
app.post("/api/logout",verify,(req,res)=>{
    const refreshToken=req.body.token;
    refreshTokens=refreshTokens.filter((token=>token!=refreshToken));
    res.status(200).json({message:"Logged out successfully"})
})
app.listen(3000, () => {
    console.log("listening on http://localhost:3000");
});
