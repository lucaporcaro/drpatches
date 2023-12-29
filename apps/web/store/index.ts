import { configureStore } from "@reduxjs/toolkit";
import createProductSlice from "./slices/createProduct";
import user from "./slices/user";

export const store = configureStore({
  reducer: {
    createProduct: createProductSlice,
    user: user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
