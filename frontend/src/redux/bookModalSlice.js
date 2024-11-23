import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  edit_data: null,
  add_rec: null,
};

const bookModalSlice = createSlice({
  name: "bookModal",
  initialState,
  reducers: {
    open_book: (state) => {
      state.show = true;
    },
    close_book: (state) => {
      state.show = false;
    },
    set_edit_data: (state, action) => {
      state.edit_data = action.payload;
    },
    set_add_rec: (state, action) => {
      state.add_rec = action.payload;
    },
  },
});
export const { open_book, close_book, set_edit_data, set_add_rec } =
  bookModalSlice.actions;
export default bookModalSlice.reducer;
