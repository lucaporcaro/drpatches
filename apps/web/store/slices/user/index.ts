import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: "admin" | "customer";
}

const initialState: UserState | {} = {};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState as UserState | {},
  reducers: {
    persistUser(state, { payload }: PayloadAction<UserState>) {
      Object.assign(state as any, payload);
    },
  },
});

export const { persistUser } = userSlice.actions;
export default userSlice.reducer;
