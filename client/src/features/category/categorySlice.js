import { createSlice } from "@reduxjs/toolkit";
import { categoryListAsyncThunk } from "./categoryAPI.js";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryProductList: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryListAsyncThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(categoryListAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProductList = action.payload.categoryProducts;
      })
      .addCase(categoryListAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;