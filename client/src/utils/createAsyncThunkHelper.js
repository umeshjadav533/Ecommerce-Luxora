import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance.js";

const createApiThunk = (type, method, url) => {
  return createAsyncThunk(type, async (data, { rejectWithValue }) => {
    try {
      const config = {
        method,
        url: typeof url === "function" ? url(data) : url,
        data,
      };
      const response = await axiosInstance(config);
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error.message ||
          "Somthing went wrong",
      );
    }
  });
};

export default createApiThunk;
