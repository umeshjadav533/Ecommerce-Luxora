import { createSlice } from "@reduxjs/toolkit";
import {
  registerUserAsyncThunk,
  loginUserAsyncThunk,
  logoutUserAsyncThunk,
  forgotUserPasswordAsyncThunk,
  resetUserPasswordAsyncThunk,
  userProfileAsyncThunk,
  sendOtpAsyncThunk,
  verifyOtpAsyncThunk,
  updateUserAsyncThunk,
} from "./authAPI";

const initialState = {
  user: null,
  isAuthenticated: false,

  loading: {
    register: false,
    login: false,
    logout: false,
    forgotPassword: false,
    resetPassword: false,
    profile: false,
    sendOtp: false,
    verifyOtp: false,
    updateUser: false,
  },

  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= REGISTER =================
      .addCase(registerUserAsyncThunk.pending, (state) => {
        state.loading.register = true;
        state.error = null;
      })
      .addCase(registerUserAsyncThunk.fulfilled, (state, action) => {
        state.loading.register = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.message = action.payload.message;
      })
      .addCase(registerUserAsyncThunk.rejected, (state, action) => {
        state.loading.register = false;
        state.error = action.payload;
      })

      // ================= LOGIN =================
      .addCase(loginUserAsyncThunk.pending, (state) => {
        state.loading.login = true;
        state.error = null;
      })
      .addCase(loginUserAsyncThunk.fulfilled, (state, action) => {
        state.loading.login = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.message = action.payload.message;
      })
      .addCase(loginUserAsyncThunk.rejected, (state, action) => {
        state.loading.login = false;
        state.error = action.payload;
      })

      // ================= LOGOUT =================
      .addCase(logoutUserAsyncThunk.pending, (state) => {
        state.loading.logout = true;
      })
      .addCase(logoutUserAsyncThunk.fulfilled, (state) => {
        state.loading.logout = false;
        state.user = null;
        state.isAuthenticated = false;
        state.message = "Logged out successfully";
      })
      .addCase(logoutUserAsyncThunk.rejected, (state, action) => {
        state.loading.logout = false;
        state.error = action.payload;
      })

      // ================= FORGOT PASSWORD =================
      .addCase(forgotUserPasswordAsyncThunk.pending, (state) => {
        state.loading.forgotPassword = true;
        state.error = null;
      })
      .addCase(forgotUserPasswordAsyncThunk.fulfilled, (state, action) => {
        state.loading.forgotPassword = false;
        state.message = action.payload.message;
      })
      .addCase(forgotUserPasswordAsyncThunk.rejected, (state, action) => {
        state.loading.forgotPassword = false;
        state.error = action.payload;
      })

      // ================= RESET PASSWORD =================
      .addCase(resetUserPasswordAsyncThunk.pending, (state) => {
        state.loading.resetPassword = true;
      })
      .addCase(resetUserPasswordAsyncThunk.fulfilled, (state, action) => {
        state.loading.resetPassword = false;
        state.message = action.payload.message;
      })
      .addCase(resetUserPasswordAsyncThunk.rejected, (state, action) => {
        state.loading.resetPassword = false;
        state.error = action.payload;
      })

      // ================= PROFILE =================
      .addCase(userProfileAsyncThunk.pending, (state) => {
        state.loading.profile = true;
      })
      .addCase(userProfileAsyncThunk.fulfilled, (state, action) => {
        state.loading.profile = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(userProfileAsyncThunk.rejected, (state) => {
        state.loading.profile = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      // ================= SEND OTP =================
      .addCase(sendOtpAsyncThunk.pending, (state) => {
        state.loading.sendOtp = true;
      })
      .addCase(sendOtpAsyncThunk.fulfilled, (state, action) => {
        state.loading.sendOtp = false;
        state.message = action.payload.message;
      })
      .addCase(sendOtpAsyncThunk.rejected, (state, action) => {
        state.loading.sendOtp = false;
        state.error = action.payload;
      })

      // ================= VERIFY OTP =================
      .addCase(verifyOtpAsyncThunk.pending, (state) => {
        state.loading.verifyOtp = true;
      })
      .addCase(verifyOtpAsyncThunk.fulfilled, (state, action) => {
        state.loading.verifyOtp = false;
        state.message = action.payload.message;
        state.user.isVerified = true;
      })
      .addCase(verifyOtpAsyncThunk.rejected, (state, action) => {
        state.loading.verifyOtp = false;
        state.error = action.payload;
      })

      // ================= UPDATE USER =================
      .addCase(updateUserAsyncThunk.pending, (state) => {
        state.loading.updateUser = true;
      })
      .addCase(updateUserAsyncThunk.fulfilled, (state, action) => {
        state.loading.updateUser = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(updateUserAsyncThunk.rejected, (state, action) => {
        state.loading.updateUser = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearMessage } = authSlice.actions;
export default authSlice.reducer;