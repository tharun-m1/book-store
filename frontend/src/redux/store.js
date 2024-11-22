import { configureStore } from "@reduxjs/toolkit";

import logoutReducer from "./logoutSlice";
import bookModalReducer from "./bookModalSlice";
import deleteModalReducer from "./deleteModalSlice";
import authReducer from "./authSlice";
import bookStoreReducer from "./bookStoreSlice";

export const store = configureStore({
  reducer: {
    logout: logoutReducer,
    bookModal: bookModalReducer,
    deleteModal: deleteModalReducer,
    auth: authReducer,
    bookStore: bookStoreReducer,
  },
});
