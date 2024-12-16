import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  note: { type: String, required: true },
  detail: { type: String },
  income: { type: Number, required: true },
  category: { type: String, required: true },
});

// Create a model from the schema
const Income = mongoose.model('Income', incomeSchema);

export default Income;  // Exporting the model for use in other files
