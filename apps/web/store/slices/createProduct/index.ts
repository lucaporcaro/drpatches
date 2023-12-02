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
  patchWidth: 20,
  patchHeight: 20,
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
    restoreCreateProduct(state, { payload }: PayloadAction<any>) {
      for (const key in payload)
        (state as any)[key] = !/^\d+$/.test(payload[key])
          ? payload[key]
          : parseFloat(payload[key]);
    },
    updateCreateProduct(
      state,
      { payload }: PayloadAction<{ key: string; value: string }>
    ) {
      (state as any)[payload.key] = payload.value;
    },
    calculateProductPrice(
      state,
      { payload }: PayloadAction<CreateProductState>
    ) {
      if (!payload.type || !payload.backingType) {
        state.price = 0;
        return;
      }
      const size = (payload.patchWidth + payload.patchHeight) / 2;
      const pricePerOne =
        (prices as any)[payload.type][formatPrintSize(size).toString() as any] +
        (payload.type === "image" ? 39 / payload.quantity : 0);
      // console.dir(state.backingType);
      let backingPrice = 0;
      switch (payload.backingType) {
        case "termoadesiva":
          backingPrice =
            ((payload.patchWidth * payload.patchHeight * 8) / 7500) * 2;
          break;
        case "velcro_a":
        case "velcro_b":
        case "velcro_a_b":
          backingPrice =
            (payload.patchWidth *
              payload.patchHeight *
              (payload.backingType !== "velcro_a_b" ? 18 : 36)) /
              2500 +
            pricePerOne * 0.5;
          break;
      }
      // console.dir(backingPrice);
      state.price = Math.ceil(
        (pricePerOne + backingPrice) * 1.22 * payload.quantity
      );
    },
  },
});

export const {
  setProductType,
  restoreCreateProduct,
  updateCreateProduct,
  calculateProductPrice,
} = createProductSlice.actions;

export default createProductSlice.reducer;
