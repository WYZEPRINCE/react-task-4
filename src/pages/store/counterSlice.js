import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice ({
  name: 'counter',
  initialState: {
    quantity: 2
  },
  reducers: {
    increment: (state) => {
      state.quantity += 1;
    },
    decrement: (state) => {
      if (state.quantity > 1) {
        state.quantity -= 1;
      }
    },
    setQuantity: (state, action) => {
      if (action.payload >= 1) {
        state.quantity = action.payload;
      }
    }
  }
});

export const { increment, decrement, setQuantity } = counterSlice.actions;
export default counterSlice.reducer;
