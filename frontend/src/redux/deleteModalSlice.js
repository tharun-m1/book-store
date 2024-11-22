import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  item_data: null,
};

const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState,
  reducers: {
    open_delete: (state) => {
      state.show = true;
    },
    close_delete: (state) => {
      state.show = false;
    },
    set_delete_data: (state, action) => {
      state.item_data = action.payload;
    },
  },
});
export const { open_delete, close_delete, set_delete_data } =
  deleteModalSlice.actions;
export default deleteModalSlice.reducer;
