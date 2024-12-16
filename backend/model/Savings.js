import mongoose, { model } from 'mongoose';

const savingsSchema = new mongoose.Schema({
  goalName: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});
const savings = mongoose.model('Savings', savingsSchema);

export default savings;
