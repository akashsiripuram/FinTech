import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  note: { type: String, required: true },
  detail: { type: String },
  income: { type: Number, required: true },
  category: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Income = mongoose.model('Income', incomeSchema);

export default Income;
