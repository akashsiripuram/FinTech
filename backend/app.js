import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.route.js'; // Add .js extension for ES modules
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import expenseRouter from "./routes/expense.route.js";


mongoose
  .connect(
    "mongodb+srv://FinancialTech:FinancialTech@cluster0.wqwjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to mongoDB"))
  .catch((error) => console.log(error));

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user/dashboard",expenseRouter);

app.listen("8080", () => {
  console.log("server listening on port :", 8080);
});
