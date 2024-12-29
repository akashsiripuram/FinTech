import Income from "../models/Income.js";
import User from "../models/User.js";

export const addIncome=async (req,res)=>{
    const {id,category,date,detail,income,note}=req.body;
    
    try{    
        const user=await User.findById(id);
        const newIncome=new Income({
            category,
            date,
            detail,
            income,
            note
        })
        const savedIncome=await newIncome.save();

        user.income.push(savedIncome._id);
        const updatedUser=await user.save();
        
        res.status(200).json({
            success:true,
            message:"Income added successfully",
            user:updatedUser
        })
    }catch(err){
       
        res.status(401).json({
            status:false,
            message:"Income not added"
        })
    }

}

export const getUserWithIncome = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).populate("income"); 
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      
      
      res.status(200).json({
        success: true,
        income: user.income
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch user and Income",
      });
    }
  };
