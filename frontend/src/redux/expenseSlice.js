import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser } from "./authSlice";

const initialState = {
  isLoading: false,
  expenses: [],
};
// Inside expenseSlice.js
export const addExpense = createAsyncThunk(
  "/user/dashboard",
  async (expenseData, { dispatch }) => {
    const response = await axios.post(
      "http://localhost:8080/api/user/dashboard",
      expenseData,
      {
        withCredentials: true,
      }
    );
    // If the response contains updated user data, dispatch an action to update the user state
    if (response.data.success && response.data.user) {
      dispatch(setUser(response.data.user)); // Update the user state in authSlice
    }
    
    return response.data;
  }
);

export const getExpenses = createAsyncThunk("/user/dashboard", async () => {
 
    const response = await axios.get(
      "http://localhost:8080/api/user/dashboard",
      { withCredentials: true }
    );
    return response.data.expenses||[];
});

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses = action.payload;
      });
      builder.addCase(getExpenses.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { setExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
