import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import wishlistReducer from './wishlistSlice'
import cartReducer from './cartSlice'
import counterReducer from './counterSlice'
import profileReducer from './profileSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    counter: counterReducer,
    profile: profileReducer,
  },
});

