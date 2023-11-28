import { createSlice } from "@reduxjs/toolkit";

export interface CreateProductState {
  type?: "text" | "image";
}

const initialState: CreateProductState = {};

export const createProductSlice = createSlice({
  name: "create_product",
  initialState,
  reducers: {},
});

export const {} = createProductSlice.actions;

export default createProductSlice.reducer;
