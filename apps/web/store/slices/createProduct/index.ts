import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CreateProductState {
  type?: "text" | "image";
}

const initialState: CreateProductState = {
  type: undefined,
};

export const createProductSlice = createSlice({
  name: "create_product",
  initialState,
  reducers: {
    setProductType(state, { payload }: PayloadAction<"text" | "image">) {
      state.type = payload;
    },
  },
});

export const { setProductType } = createProductSlice.actions;

export default createProductSlice.reducer;
