import mongoose from 'mongoose';
import expenseSchema from './expenseSchema.js';
import incomeSchema from './Income.js';
import savingsSchema from './Savings.js';


// Define User Schema
const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
    income: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Income' }],
    savings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Savings' }],
  },
  { timestamps: true }
);


// Set fullName before saving the user
UserSchema.pre('save', function (next) {
  this.fullName = `${this.firstname} ${this.lastname}`;
  next();
});

// Create User model
const User = mongoose.model('User', UserSchema);

export default User;
