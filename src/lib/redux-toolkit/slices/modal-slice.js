import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setAddModal(state) {
        state.addModal = !state.addModal;
    },
  },
});

export const { setAddModal } = modalSlice.actions;

export default modalSlice.reducer;