import createApiThunk from "../../utils/createAsyncThunkHelper.js";

export const categoryListAsyncThunk = createApiThunk(
    "category",
    "get",
    "/category"
)