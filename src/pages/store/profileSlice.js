import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isDropdownOpen: false
  },
  reducers: {
    toggleDropdown: (state) => {
      state.isDropdownOpen = !state.isDropdownOpen;
    },
    closeDropdown: (state) => {
      state.isDropdownOpen = false;
    },
    openDropdown: (state) => {
      state.isDropdownOpen = true;
    }
  }
});

export const { toggleDropdown, closeDropdown, openDropdown } = profileSlice.actions;
export default profileSlice.reducer;