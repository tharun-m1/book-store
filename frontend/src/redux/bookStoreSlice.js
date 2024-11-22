import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
};

const bookStoreSlice = createSlice({
  name: "bookStore",
  initialState,
  reducers: {
    set_books: (state, action) => {
      state.books = action.payload;
    },
    add_book: (state, action) => {
      state.books.push(action.payload);
    },
    update_book: (state, action) => {
      const { id, updatedBook } = action.payload;
      const index = state.books.findIndex((book) => book.id === id);
      if (index !== -1) {
        state.books[index] = { ...state.books[index], ...updatedBook };
      }
    },
    delete_book: (state, action) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
  },
});

export const { add_book, update_book, delete_book, set_books } =
  bookStoreSlice.actions;

export default bookStoreSlice.reducer;
