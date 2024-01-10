import { configureStore } from "@reduxjs/toolkit";
import createProductSlice from "./slices/createProduct";
import user from "./slices/user";
import persistedProduct from "./slices/persistedProducts";

export const store = configureStore({
  devTools: true,
  reducer: {
    createProduct: createProductSlice,
    user: user,
    persistedProducts: persistedProduct,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
