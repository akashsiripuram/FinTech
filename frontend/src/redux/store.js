import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expenseSlice from "./expenseSlice.js";

 const store = configureStore({
  reducer: {
    auth:authReducer,
    expenses: expenseSlice,  
  },
});
export default store;
