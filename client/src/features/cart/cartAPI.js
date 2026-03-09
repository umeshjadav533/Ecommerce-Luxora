import createApiThunk from "../../utils/createAsyncThunkHelper.js";

export const getCartProductsAsyncThunk = createApiThunk(
    "cart",
    "get",
    "/cart"
);

export const addCartProductAsyncThunk = createApiThunk(
    "add",
    "post",
    "/cart/add"
);


export const updateCartProductAsyncThunk = createApiThunk(
    "update",
    "put",
    "/cart/update"
);

export const removeCartProductAsyncThunk = createApiThunk(
    "remove",
    "delete",
    "/cart/remove"
);

export const getcartSummaryAsyncThunk = createApiThunk(
    "cart-summary",
    "get",
    "/cart/cart-summary"
);