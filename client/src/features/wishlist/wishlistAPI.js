import createApiThunk from "../../utils/createAsyncThunkHelper.js";

export const getAllWishlistProductsAsyncThunk = createApiThunk(
    "wishlist",
    "get",
    "/wishlist"
);

export const addWishlistProductAsyncThunk = createApiThunk(
    "add-wishlist",
    "post",
    "/wishlist/add"
);

export const removeWishlistProductAsyncThunk = createApiThunk(
    "remove-wishlist",
    "delete",
    "/wishlist/remove"
);