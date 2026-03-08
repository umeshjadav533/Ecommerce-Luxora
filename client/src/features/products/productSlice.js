import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProductsAsyncThunk,
  getSingleProductAsyncThunk,
  categoryPageProductAsyncThunk,
  getTagProductAsyncThunk,
} from "./productAPI.js";

const initialState = {
  products: [],
  singleProduct: null,
  categoryProducts: [],
  tagProducts: [],

  loading: {
    productsLoading: false,
    singleProductLoading: false,
    categoryProductsLoading: false,
    tagProductsLoading: false
  },

  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ALL PRODUCTS
      .addCase(getAllProductsAsyncThunk.pending, (state) => {
        state.loading.productsLoading = true;
      })
      .addCase(getAllProductsAsyncThunk.fulfilled, (state, action) => {
        state.loading.productsLoading = false;
        state.products = action.payload.products;
      })
      .addCase(getAllProductsAsyncThunk.rejected, (state, action) => {
        state.loading.productsLoading = false;
        state.products = [];
        state.error = action.error.message;
      })

      // SINGLE PRODUCT
      .addCase(getSingleProductAsyncThunk.pending, (state) => {
        state.loading.singleProductLoading = true;
      })
      .addCase(getSingleProductAsyncThunk.fulfilled, (state, action) => {
        state.loading.singleProductLoading = false;
        state.singleProduct = action.payload.product;
      })
      .addCase(getSingleProductAsyncThunk.rejected, (state, action) => {
        state.loading.singleProductLoading = false;
        state.singleProduct = [];
        state.error = action.error.message;
      })

      // CATEGORY PRODUCTS
      .addCase(categoryPageProductAsyncThunk.pending, (state) => {
        state.loading.categoryProductsLoading = true;
      })
      .addCase(categoryPageProductAsyncThunk.fulfilled, (state, action) => {
        state.loading.categoryProductsLoading = false;
        state.categoryProducts = action.payload;
      })
      .addCase(categoryPageProductAsyncThunk.rejected, (state, action) => {
        state.loading.categoryProductsLoading = false;
        state.categoryProducts = [];
        state.error = action.error.message;
      })

      // TAG PRODUCTS
      .addCase(getTagProductAsyncThunk.pending, (state) => {
        state.loading.tagProductsLoading = true;
      })
      .addCase(getTagProductAsyncThunk.fulfilled, (state, action) => {
        state.loading.tagProductsLoading = false;
        state.tagProducts = action.payload.products;
      })
      .addCase(getTagProductAsyncThunk.rejected, (state, action) => {
        state.loading.tagProductsLoading = false;
        state.tagProducts = [];
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;