import createApiThunk from "../../utils/createAsyncThunkHelper.js";

export const getAllProductsAsyncThunk = createApiThunk(
  "products",
  "get",
  (data) => `/product?limit=${data.limit}&query=${data.query}`
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
    '/product/tag'
)