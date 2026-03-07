import createApiThunk from "../../utils/createAsyncThunkHelper.js";

export const getAllProductsAsyncThunk = createApiThunk(
    "products",
    "get",
    "/product/"
);

export const getSingleProductAsyncThunk = createApiThunk(
    "singleProduct",
    "post",
    (data) => `/product/${data.id}`
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