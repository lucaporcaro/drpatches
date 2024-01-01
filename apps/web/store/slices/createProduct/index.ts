import { updateProduct } from "@app/actions/product";
import prices from "@app/assets/data/prices";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
    updateCreatedProduct(state: any, { payload: { key, value } }: PayloadAction<{ key: string, value: any }>) {
      state[key] = value;


    },
    loadCreatedProduct(state: any, { payload }) {
      for (const key of Object.keys(payload))
        state[key] = payload[key];
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

      const tablePrice = Object.entries(prices[type])
        .filter(([key]) => {
          return (typeof key === "number" ? key : parseFloat(key)) >= size;
        })
        .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))[0] as any[];

      console.log(
        `Current Table Price for size ${size}: ${tablePrice[0]} = ${tablePrice[1]}`
      );

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
  calculateProductPrice,
  reset,
  updateCreatedProduct,
  loadCreatedProduct
} = createProductSlice.actions;

export default createProductSlice.reducer;
