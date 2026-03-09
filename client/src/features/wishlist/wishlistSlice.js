import { createSlice } from "@reduxjs/toolkit";
import { addWishlistProductAsyncThunk, getAllWishlistProductsAsyncThunk, removeWishlistProductAsyncThunk } from "./wishlistAPI";

const initialState = {
  wishlistProducts: [],
  loading: {
    wishlistProductsLoading: false,
    addProductLoading: false,
    removeProductLoading: false,
  },
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET ALL WISHLIST PRODUCTS
      .addCase(getAllWishlistProductsAsyncThunk.pending, (state) => {
        state.loading.wishlistProductsLoading = true;
      })

      .addCase(getAllWishlistProductsAsyncThunk.fulfilled, (state, action) => {
        state.loading.wishlistProductsLoading = false;
        state.wishlistProducts = action.payload.products || [];
      })

      .addCase(getAllWishlistProductsAsyncThunk.rejected, (state, action) => {
        state.loading.wishlistProductsLoading = false;
        state.wishlistProducts = [];
        state.error = action.error.message;
      })

      // ADD WISHLIST PRODUCTS
      .addCase(addWishlistProductAsyncThunk.pending, (state) => {
        state.loading.addProductLoading = true;
      })

      .addCase(addWishlistProductAsyncThunk.fulfilled, (state, action) => {
        state.loading.addProductLoading = false;
        state.wishlistProducts = action.payload.products || [];
      })

      .addCase(addWishlistProductAsyncThunk.rejected, (state, action) => {
        state.loading.addProductLoading = false;
        state.wishlistProducts = [];
        state.error = action.error.message;
      })

      // REMOVE WISHLIST PRODUCTS
      .addCase(removeWishlistProductAsyncThunk.pending, (state) => {
        state.loading.removeProductLoading = true;
      })

      .addCase(removeWishlistProductAsyncThunk.fulfilled, (state, action) => {
        state.loading.removeProductLoading = false;
        state.wishlistProducts = action.payload.products || [];
      })

      .addCase(removeWishlistProductAsyncThunk.rejected, (state, action) => {
        state.loading.removeProductLoading = false;
        state.wishlistProducts = [];
        state.error = action.error.message;
      })
  },
});

export default wishlistSlice.reducer;