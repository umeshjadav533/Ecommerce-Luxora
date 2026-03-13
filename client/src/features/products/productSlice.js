import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProductsAsyncThunk,
  getSingleProductAsyncThunk,
  categoryPageProductAsyncThunk,
  getTagProductAsyncThunk,
  getRelatedProductsAsyncThunk,
  getSearchProductAsyncThunk,
  getSearchProductsFilterAsyncThunk,
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

  searchProductsData: {
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

  searchProductsFilter: {
    brands: [],
    categories: [],
    subCategories: [],
    tags: [],
    loading: false
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
      .addCase(getSearchProductAsyncThunk.pending, (state) => {
        state.searchProductsData.loading = true;
      })
      .addCase(getSearchProductAsyncThunk.fulfilled, (state, action) => {
        state.searchProductsData.loading = false;
        state.searchProductsData.products = action.payload.products;
        state.searchProductsData.meta = action.payload.meta; 
      })
      .addCase(getSearchProductAsyncThunk.rejected, (state, action) => {
        state.searchProductsData.loading = false;
        state.searchProductsData.products = [];
        state.error = action.error.message;
      })

      // ================= SEARCH FILTER OPTIONS =================
      .addCase(getSearchProductsFilterAsyncThunk.pending, (state) => {
        state.searchProductsFilter.loading = true;
      })
      .addCase(getSearchProductsFilterAsyncThunk.fulfilled, (state, action) => {
        state.searchProductsFilter.loading = false;
        state.searchProductsFilter.brands = action.payload.brands;
        state.searchProductsFilter.tags = action.payload.tags;
        state.searchProductsFilter.categories = action.payload.categories;
        state.searchProductsFilter.subCategories = action.payload.subCategories;
      })
      .addCase(getSearchProductsFilterAsyncThunk.rejected, (state, action) => {
        state.searchProductsFilter.loading = false;
        state.searchProductsFilter.brands = [];
        state.searchProductsFilter.tags = [];
        state.searchProductsFilter.categories = [];
        state.searchProductsFilter.subCategories = [];
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