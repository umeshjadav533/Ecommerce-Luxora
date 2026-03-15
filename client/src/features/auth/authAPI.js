import createApiThunk from "../../utils/createAsyncThunkHelper.js";

export const registerUserAsyncThunk = createApiThunk(
  "auth/register",
  "post",
  "/auth/register",
);

export const loginUserAsyncThunk = createApiThunk(
    "auth/login",
    "post",
    "/auth/login"
);

export const logoutUserAsyncThunk = createApiThunk(
    "auth/logout",
    "get",
    "/auth/logout"
);

export const forgotUserPasswordAsyncThunk = createApiThunk(
    "auth/password/forgot-password",
    "post",
    "/auth/password/forgot-password"
);

export const resetUserPasswordAsyncThunk = createApiThunk(
    "auth/password/reset-password/",
    "put",
    (data) => `/auth/password/reset-password/${data.token}`
);

export const userProfileAsyncThunk = createApiThunk(
    "auth/profile",
    "get",
    "/auth/profile"
);

export const sendOtpAsyncThunk = createApiThunk(
    "auth/send-otp",
    "post",
    "/auth/send-otp"
);

export const verifyOtpAsyncThunk = createApiThunk(
    "auth/verify-otp",
    "post",
    "/auth/verify-otp"
);

export const updateUserAsyncThunk = createApiThunk(
    "auth/update-user",
    "put",
    "/auth/update-user"
);