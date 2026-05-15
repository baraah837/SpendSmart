import { createSlice } from "@reduxjs/toolkit";
const expenseSlice = createSlice({
 name: "expenses",
 initialState: {
   items: []
 },
 reducers: {
   setExpenses: (state, action) => {
     state.items = action.payload;
   }
 }
});
export const { setExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;