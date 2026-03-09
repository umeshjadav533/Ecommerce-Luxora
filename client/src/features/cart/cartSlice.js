import { createSlice } from "@reduxjs/toolkit";
import {
  getCartProductsAsyncThunk,
  addCartProductAsyncThunk,
  updateCartProductAsyncThunk,
  removeCartProductAsyncThunk,
  getcartSummaryAsyncThunk,
} from "./cartAPI.js";

const initialState = {
  isCartOpen: false,
  cartProducts: [],
  cartSummary: null,
  loading: {
    cartProductsLoading: false,
    addProductLoading: false,
    updateProductLoading: false,
    removeProductLoading: false,
    cartSummaryLoading: false,
  },
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    openCart: (state) => {
      state.isCartOpen = true;
    },
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    clearCartError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // GET CART PRODUCTS
      .addCase(getCartProductsAsyncThunk.pending, (state) => {
        state.loading.cartProductsLoading = true;
        state.error = null;
      })
      .addCase(getCartProductsAsyncThunk.fulfilled, (state, action) => {
        state.loading.cartProductsLoading = false;
        state.cartProducts = action.payload.cart || [];
      })
      .addCase(getCartProductsAsyncThunk.rejected, (state, action) => {
        state.loading.cartProductsLoading = false;
        state.error = action.error?.message || "Failed to fetch cart";
      })

      // ADD PRODUCT
      .addCase(addCartProductAsyncThunk.pending, (state) => {
        state.loading.addProductLoading = true;
        state.error = null;
      })
      .addCase(addCartProductAsyncThunk.fulfilled, (state, action) => {
        state.loading.addProductLoading = false;
        state.cartProducts = action.payload.cart || [];
      })
      .addCase(addCartProductAsyncThunk.rejected, (state, action) => {
        state.loading.addProductLoading = false;
        state.error = action.error?.message || "Failed to add product";
      })

      // UPDATE PRODUCT
      .addCase(updateCartProductAsyncThunk.pending, (state) => {
        state.loading.updateProductLoading = true;
        state.error = null;
      })
      .addCase(updateCartProductAsyncThunk.fulfilled, (state, action) => {
        state.loading.updateProductLoading = false;
        state.cartProducts = action.payload.cart || [];
      })
      .addCase(updateCartProductAsyncThunk.rejected, (state, action) => {
        state.loading.updateProductLoading = false;
        state.error = action.error?.message || "Failed to update product";
      })

      // REMOVE PRODUCT
      .addCase(removeCartProductAsyncThunk.pending, (state) => {
        state.loading.removeProductLoading = true;
        state.error = null;
      })
      .addCase(removeCartProductAsyncThunk.fulfilled, (state, action) => {
        state.loading.removeProductLoading = false;
        state.cartProducts = action.payload.cart || [];
      })
      .addCase(removeCartProductAsyncThunk.rejected, (state, action) => {
        state.loading.removeProductLoading = false;
        state.error = action.error?.message || "Failed to remove product";
      })

      // CART SUMMARY
      .addCase(getcartSummaryAsyncThunk.pending, (state) => {
        state.loading.cartSummaryLoading = true;
        state.error = null;
      })
      .addCase(getcartSummaryAsyncThunk.fulfilled, (state, action) => {
        state.loading.cartSummaryLoading = false;
        state.cartSummary = action.payload.summary || null;
      })
      .addCase(getcartSummaryAsyncThunk.rejected, (state, action) => {
        state.loading.cartSummaryLoading = false;
        state.error = action.error?.message || "Failed to fetch summary";
      });
  },
});

export const { toggleCart, openCart, closeCart, clearCartError } = cartSlice.actions;
export default cartSlice.reducer;