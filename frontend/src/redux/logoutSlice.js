import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    open_logout: (state) => {
      state.show = true;
    },
    close_logout: (state) => {
      state.show = false;
    },
  },
});
export const { open_logout, close_logout } = logoutSlice.actions;
export default logoutSlice.reducer;
