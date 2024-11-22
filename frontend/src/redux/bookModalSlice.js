import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  edit_data: null,
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
  },
});
export const { open_book, close_book, set_edit_data } = bookModalSlice.actions;
export default bookModalSlice.reducer;
