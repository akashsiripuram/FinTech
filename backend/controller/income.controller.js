import Income from "../../frontend/src/pages/income/income.jsx";
import User from "../model/User.js";
import jwt from 'jsonwebtoken';
export const createIncome= async (req, res) => {
  try {
    const { date, note, detail, expense, category } = req.body;

    // Check if all required fields are present
    if (!date || !note || !expense || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new expense using the model
    const newExpense = new Income({
      date,
      note,
      detail,
      expense,
      category,
    });

    // Save the new expense to the database
    const savedExpense = await newExpense.save();
    
    // Fetch the user associated with the expense
    const user = await User.findById(req.user.id);
    
    // Add the expense to the user's expenses array
    user.expenses.push(savedExpense._id);
    await user.save();
    
    // Send the saved expense as the response
    
    res.status(201).json(savedExpense);  // Send the saved expense as the response
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




export const getUserExpenses = async (req, res) => {
  try {
    // Extract token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Assuming 'Bearer <token>'
    
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    // Verify the token and extract user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;  // Assuming the payload contains 'id'

    // Fetch expenses associated with the user
    const expenses = await Expense.find({ user: userId });


    res.status(200).json(expenses);  // Send the expenses as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

