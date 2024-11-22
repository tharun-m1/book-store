import { createSlice } from "@reduxjs/toolkit";

const auth = JSON.parse(localStorage.getItem("auth"));

const initialState = {
  token: auth?.token || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initiate_user_data: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("auth", JSON.stringify(state));
    },
  },
});
export const { initiate_user_data } = authSlice.actions;
export default authSlice.reducer;
