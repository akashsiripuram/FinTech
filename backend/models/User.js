import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
    income: [{ type: mongoose.Schema.Types.ObjectId, ref: "Income" }],
    savings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Savings" }],
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
    this.fullName = `${this.firstname} ${this.lastname}`;
    next();
});

const User = mongoose.model('User', userSchema);
export default User;
