import Expense from "../models/Expense.js";
import User from "../models/User.js";

export const addExpense=async (req,res)=>{
    const {id,category,date,detail,expense,note}=req.body;
    
    try{    
        const user=await User.findById(id);
        const newExpense=new Expense({
            category,
            date,
            detail,
            expense,
            note
        })
        const savedExpense=await newExpense.save();

        user.expenses.push(savedExpense._id);
        const updatedUser=await user.save();
        
        res.status(200).json({
            success:true,
            message:"Expense added successfully",
            user:updatedUser
        })
    }catch(err){
       
        res.status(401).json({
            status:false,
            message:"Expense not added"
        })
    }

}

export const getUserWithExpenses = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate("expenses"); // Assuming "expenses" references the Expense schema
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      console.log("dashboard expenses",user.expenses);
      res.status(200).json({
        success: true,
        expenses:user.expenses,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch user and expenses",
      });
    }
  };