import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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
    font?: string;
    backingType?: string;
    image?: File;
    price: number | string;
    status?: string;
    note?: string;
    isReadyForPayment: boolean;
}

const initialState: CreateProductState = {
    id: undefined,
    patchWidth: 10,
    patchHeight: 10,
    quantity: 50,
    borderColor: "#111",
    textColor: "#111",
    backgroundColor: "#fff",
    price: 0,
    type: undefined,
    text: undefined,
    patchType: undefined,
    backingType: undefined,
    image: undefined,
    note: "",
    font: undefined,
    isReadyForPayment: false,
};

export const createProductSlice = createSlice({
    name: "create_product",
    initialState,
    reducers: {
        updateCreatedProduct(
            state: any,
            {payload: {key, value}}: PayloadAction<{ key: string; value: any }>
        ) {
            state[key] = value;
        },
        loadCreatedProduct(state: any, {payload}) {
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

export const {reset, updateCreatedProduct, loadCreatedProduct} =
    createProductSlice.actions;

export default createProductSlice.reducer;
