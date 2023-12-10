import prices from "@app/assets/data/prices";
import { formatPrintSize } from "@app/utils/price";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CreateProductState {
  type?: "text" | "image";
  text?: string;
  borderColor?: string;
  textColor?: string;
  backgroundColor?: string;
  patchWidth: number;
  patchHeight: number;
  quantity: number;
  patchType?: string;
  backingType?: string;
  image?: File;
  price: number | string;
}

const initialState: CreateProductState = {
  patchWidth: 10,
  patchHeight: 10,
  quantity: 50,
  borderColor: "#111",
  textColor: "#111",
  backgroundColor: "#111",
  price: 0,
};

export const createProductSlice = createSlice({
  name: "create_product",
  initialState,
  reducers: {
    setProductType(state, { payload }: PayloadAction<"text" | "image">) {
      state.type = payload;
    },
    restoreCreateProduct(state, { payload }) {
      Object.entries(payload).forEach(([key, value]) => {
        (state as any)[key] = !/^\d+$/.test(payload[key])
          ? payload[key]
          : parseFloat(payload[key]);
      });
    },
    updateCreateProduct(
      state,
      { payload: { key, value } }: PayloadAction<{ key: string; value: string }>
    ) {
      (state as any)[key] = value;
    },
    calculateProductPrice(
      state,
      { payload }: PayloadAction<CreateProductState>
    ) {
      const { type, backingType, patchHeight, patchWidth, quantity } = payload;

      if (!type || !backingType) {
        state.price = 0;
        return;
      }
      const size = (patchWidth + patchHeight) / 2;

      const tablePrice = Object.entries(prices[type]).filter(
        ([key]) => parseFloat(key) >= size
      )[0];

      const pricePerOne =
        (tablePrice ? tablePrice[1] : 0) +
        (type === "image" ? 39 / quantity : 0);

      const backingPriceLookup: { [key: string]: number } = {
        termoadesiva: ((patchWidth * patchHeight * 8) / 7500) * 2,
        velcro_a: (patchWidth * patchHeight * 18) / 2500 + pricePerOne * 0.5,
        velcro_b: (patchWidth * patchHeight * 18) / 2500 + pricePerOne * 0.5,
        velcro_a_b: (patchWidth * patchHeight * 36) / 2500 + pricePerOne * 0.5,
      };
      const backingPrice = backingPriceLookup[backingType] || 0;

      state.price = ((pricePerOne + backingPrice) * 1.22 * quantity).toFixed(2);
    },

    reset(state: any) {
      Object.keys(state).forEach((key) => {
        state[key] = (initialState as any)[key];
      });
    },
  },
});

export const {
  setProductType,
  restoreCreateProduct,
  updateCreateProduct,
  calculateProductPrice,
  reset,
} = createProductSlice.actions;

export default createProductSlice.reducer;
