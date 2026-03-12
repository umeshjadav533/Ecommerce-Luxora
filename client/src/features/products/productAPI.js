import createApiThunk from "../../utils/createAsyncThunkHelper.js";

export const getAllProductsAsyncThunk = createApiThunk(
  "products",
  "get",
  (data) => `/product?page=${data.page}&limit=${data.limit}`
);

export const getSingleProductAsyncThunk = createApiThunk(
    "singleProduct",
    "get",
    (data) => `/product/${data.id}`
)

export const getRelatedProductsAsyncThunk = createApiThunk(
    "related-products",
    "get",
    (data) => `/product/${data.id}?limit=${data.limit}`
)


export const categoryPageProductAsyncThunk = createApiThunk(
    "category-page",
    "get",
    (data) => `/product/category-page/${data.category}`
)

export const getTagProductAsyncThunk = createApiThunk(
  "tag-product",
  "post",
  "/product/tag"
);

export const getFilteredProductAsyncThunk = createApiThunk(
  "filter-products",
  "get",
  (params) => {
    const query = new URLSearchParams(params).toString();
    return `/product/filter?${query}`;
  }
);