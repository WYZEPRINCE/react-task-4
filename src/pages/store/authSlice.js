import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../utils/firebase"; // Import auth from firebase.js


export const registerAsync = createAsyncThunk(
  "auth/register",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isAuth = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
