import { createSlice } from "@reduxjs/toolkit";
import GamePad from "../../assets/images/gamepad.png"
import TV from "../../assets/images/tv.png"

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [
      {
        id: 1,
        name: 'LCD Monitor',
        price: 650,
        quantity: 1,
        image: TV
      },
      {
        id: 2,
        name: 'Hi Gamepad',
        price: 550,
        quantity: 2,
        image: GamePad
      }
    ],
    couponCode: '',
    couponDiscount: 0,
    cart: []
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        const item = state.items.find(item => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    applyCoupon: (state, action) => {
      state.couponCode = action.payload;
      state.couponDiscount = action.payload === 'SAVE10' ? 10 : 0;
    },
    clearCart: (state) => {
        state.items = [];
        state.couponCode = '';
        state.couponDiscount = 0;
    }
  }
});

export const { addToCart, updateQuantity, removeFromCart, applyCoupon, clearCart } = cartSlice.actions;
export default cartSlice.reducer;