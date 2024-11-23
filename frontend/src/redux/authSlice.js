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
    remove_token: (state) => {
      state.token = null;
      localStorage.removeItem("auth");
    },
  },
});
export const { initiate_user_data, remove_token } = authSlice.actions;
export default authSlice.reducer;
