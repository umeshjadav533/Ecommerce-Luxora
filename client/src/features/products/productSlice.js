import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProductsAsyncThunk,
  getSingleProductAsyncThunk,
  categoryPageProductAsyncThunk,
  getTagProductAsyncThunk,
  getRelatedProductsAsyncThunk,
  getFilteredProductAsyncThunk,
} from "./productAPI.js";

const initialState = {
  productsData: {
    products: [],
    meta: {
      totalDocs: 0,
      limit: 5,
      totalPages: 0,
      currentPage: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    },
    loading: false,
  },

  filteredProductsData: {
    products: [],
    meta: {
      totalDocs: 0,
      limit: 5,
      totalPages: 0,
      currentPage: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    },
    loading: false,
  },

  productData: {
    product: null,
    loading: false,
  },

  categoryPageData: {
    categoryProducts: [],
    meta: {
      totalDocs: 0,
      limit: 5,
      totalPages: 0,
      currentPage: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    },
    loading: false,
  },

  tagProductsData: {
    products: [],
    meta: {
      totalDocs: 0,
      limit: 5,
      totalPages: 0,
      currentPage: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    },
    loading: false,
  },

  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= ALL PRODUCTS =================
      .addCase(getAllProductsAsyncThunk.pending, (state) => {
        state.productsData.loading = true;
      })
      .addCase(getAllProductsAsyncThunk.fulfilled, (state, action) => {
        state.productsData.loading = false;
        state.productsData.products = action.payload.products;
        state.productsData.meta = action.payload.meta;
      })
      .addCase(getAllProductsAsyncThunk.rejected, (state, action) => {
        state.productsData.loading = false;
        state.error = action.error.message;
      })

      // ================= FILTERED PRODUCTS =================
      .addCase(getFilteredProductAsyncThunk.pending, (state) => {
        state.filteredProductsData.loading = true;
      })
      .addCase(getFilteredProductAsyncThunk.fulfilled, (state, action) => {
        state.filteredProductsData.loading = false;
        state.filteredProductsData.products = action.payload.products;
        state.filteredProductsData.meta = action.payload.meta; 
      })
      .addCase(getFilteredProductAsyncThunk.rejected, (state, action) => {
        state.filteredProductsData.loading = false;
        state.filteredProductsData.products = [];
        state.error = action.error.message;
      })

      // ================= SINGLE PRODUCT =================
      .addCase(getSingleProductAsyncThunk.pending, (state) => {
        state.productData.loading = true;
      })
      .addCase(getSingleProductAsyncThunk.fulfilled, (state, action) => {
        state.productData.loading = false;
        state.productData.product = action.payload.product;
      })
      .addCase(getSingleProductAsyncThunk.rejected, (state, action) => {
        state.productData.loading = false;
        state.productData.product = null;
        state.error = action.error.message;
      })

      // ================= CATEGORY PRODUCTS =================
      .addCase(categoryPageProductAsyncThunk.pending, (state) => {
        state.categoryPageData.loading = true;
      })
      .addCase(categoryPageProductAsyncThunk.fulfilled, (state, action) => {
        state.categoryPageData.loading = false;
        state.categoryPageData.categoryProducts = action.payload.products;
        state.categoryPageData.meta = action.payload.meta;
      })
      .addCase(categoryPageProductAsyncThunk.rejected, (state, action) => {
        state.categoryPageData.loading = false;
        state.categoryPageData.categoryProducts = [];
        state.error = action.error.message;
      })

      // ================= TAG PRODUCTS =================
      .addCase(getTagProductAsyncThunk.pending, (state) => {
        state.tagProductsData.loading = true;
      })
      .addCase(getTagProductAsyncThunk.fulfilled, (state, action) => {
        state.tagProductsData.loading = false;
        state.tagProductsData.products = action.payload.products;
        state.tagProductsData.meta = action.payload.meta;
      })
      .addCase(getTagProductAsyncThunk.rejected, (state, action) => {
        state.tagProductsData.loading = false;
        state.tagProductsData.products = [];
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;