import { configureStore } from "@reduxjs/toolkit";
import createProductSlice from "./slices/createProduct";

export const store = configureStore({
  reducer: {
    createProduct: createProductSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
