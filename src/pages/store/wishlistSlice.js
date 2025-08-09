import { createSlice } from '@reduxjs/toolkit';
import ProductCard from '../../components/ProductCard';

const initialState = {
  items: [
    
  ],
  count: 0
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (!existingItem) {
        state.items.push(product);
        state.count = state.items.length;
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      state.count = state.items.length;
    },
    clearWishlist: (state) => {
      state.items = [];
      state.count = 0;
    },
    moveAllToBag: (state) => {
      state.items = [];
      state.count = 0;
    }
  }
});

export const { 
  addToWishlist, 
  removeFromWishlist, 
  clearWishlist, 
  moveAllToBag 
} = wishlistSlice.actions; 

export default wishlistSlice.reducer;