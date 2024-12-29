import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser } from "./authSlice";

const initialState = {
  isLoading: false,
  income: [],
};
// Inside expenseSlice.js
export const addIncome = createAsyncThunk(
  "/user/dashboard",
  async (incomeData, { dispatch }) => {
    const response = await axios.post(
      "http://localhost:8080/api/user/income/add",
      incomeData,
      {
        withCredentials: true,
      }
    );
    
    if (response.data.success && response.data.user) {
      dispatch(setUser(response.data.user)); 
    }
    
    return response.data;
  }
);

export const getIncome = createAsyncThunk("/user/income", async () => {
 
    const response = await axios.get(
      "http://localhost:8080/api/user/income",
      { withCredentials: true }
    );
    return response.data.income||[];
});

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    setIncome: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.income = action.payload;
      });
      builder.addCase(getIncome.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { setIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
