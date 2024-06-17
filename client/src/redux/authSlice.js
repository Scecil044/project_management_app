import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authPendingState: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    authFulfilledState: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
    },
    authRejectedState: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isError = false;
    },
  },
});

export const {
  authPendingState,
  authFulfilledState,
  authRejectedState,
  logoutUser,
} = authSlice.actions;
export default authSlice.reducer;
