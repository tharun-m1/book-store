import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  recommendations: [],
};

const bookStoreSlice = createSlice({
  name: "bookStore",
  initialState,
  reducers: {
    set_books: (state, action) => {
      state.books = action.payload;
    },
    set_recommendations: (state, action) => {
      state.recommendations = action.payload;
    },
  },
});

export const { set_recommendations, set_books } = bookStoreSlice.actions;

export default bookStoreSlice.reducer;
