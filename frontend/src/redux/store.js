import { configureStore } from "@reduxjs/toolkit";

import logoutReducer from "./logoutSlice";

export const store = configureStore({
  reducer: {
    logout: logoutReducer,
  },
});
