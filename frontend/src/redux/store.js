import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expenseSlice from "./expenseSlice.js";
import incomeSlice from "./incomeSlice.js";

 const store = configureStore({
  reducer: {
    auth:authReducer,
    expenses: expenseSlice,  
    income:incomeSlice,
  },
});
export default store;
