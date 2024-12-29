import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  note: { type: String, required: true },
  detail: { type: String },
  expense: { type: Number, required: true },
  category: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
