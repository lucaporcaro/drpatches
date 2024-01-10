import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateProductState } from "../createProduct";

interface IPersistedProducts {
  products: CreateProductState[];
}

const initialState: IPersistedProducts = {
  products: [],
};

export const persistedProductSlide = createSlice({
  name: "persisted_product",
  initialState,
  reducers: {
    loadPersistedProducts(
      state,
      { payload }: PayloadAction<CreateProductState[]>
    ) {
      state.products = payload;
    },
    addToPersistedProduct(
      state,
      { payload }: PayloadAction<CreateProductState>
    ) {
      state.products.push(payload);
    },
    updateSpecificPersistedProduct(
      state,
      { payload }: PayloadAction<CreateProductState>
    ) {
      state.products = state.products.map((product) => {
        return product.id === payload.id ? payload : product;
      });
    },
    clearPersistedProducts(state) {
      state.products = [];
      localStorage.removeItem("created_products");
    },
  },
});

persistedProductSlide;

export const {
  addToPersistedProduct,
  updateSpecificPersistedProduct,
  clearPersistedProducts,
  loadPersistedProducts,
} = persistedProductSlide.actions;

export default persistedProductSlide.reducer;
