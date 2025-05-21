import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
  filter: {
    priority: "",
  },
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setData(state, { payload }) {
      state.data = payload;
    },
    addData(state, { payload }) {
      state.data = payload;
    },
    removeData(state, { payload }) {

      state.data = state.data.filter(todo => todo.id !== payload);
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    setFilter(state, { payload }) {
      state.filter = payload;
    },
  },
});

export const { setData, setLoading, setFilter, addData, removeData } = todoSlice.actions;

export default todoSlice.reducer;