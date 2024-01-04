import prices from "@app/assets/data/prices";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CreateProductState {
  id?: string;
  type?: "text" | "image";
  text?: string;
  borderColor: string;
  textColor: string;
  backgroundColor: string;
  patchWidth: number;
  patchHeight: number;
  quantity: number;
  patchType?: string;
  backingType?: string;
  image?: File;
  price: number | string;
  status?: string;
}

const initialState: CreateProductState = {
  id: undefined,
  patchWidth: 10,
  patchHeight: 10,
  quantity: 50,
  borderColor: "#111",
  textColor: "#111",
  backgroundColor: "#111",
  price: 0,
  type: undefined,
  text: undefined,
  patchType: undefined,
  backingType: undefined,
  image: undefined,
};

export const createProductSlice = createSlice({
  name: "create_product",
  initialState,
  reducers: {
    updateCreatedProduct(
      state: any,
      { payload: { key, value } }: PayloadAction<{ key: string; value: any }>
    ) {
      state[key] = value;
    },
    loadCreatedProduct(state: any, { payload }) {
      for (const key of Object.keys(payload)) {
        state[key] = payload[key];
      }
    },

    reset(state: any) {
      Object.keys(state).forEach((key) => {
        state[key] = (initialState as any)[key];
      });
    },
  },
});

export const { reset, updateCreatedProduct, loadCreatedProduct } =
  createProductSlice.actions;

export default createProductSlice.reducer;
