import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get('http://localhost:3000/products')
    return response.data
})

const initialState = {
    products: {
        items: [],
        status: "loading"
    }
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.products.items = [];
                state.products.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products.items = action.payload;
                state.products.status = 'loaded';
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.products.items = [];
                state.products.status = 'error';
            });
    }
})

export const productsReducer = productsSlice.reducer;
