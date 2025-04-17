import {createSlice} from '@reduxjs/toolkit';
import {getMarketInfo} from "./marketInfoThunk";

export const initialState: any = {
    isLoading: false,
    data: {},
};

export const marketInfoSlice = createSlice({
    name: 'marketInfo',
    initialState,
    reducers: {},
    extraReducers: (builder): void => {
        builder.addCase(getMarketInfo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMarketInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
        });
        builder.addCase(getMarketInfo.rejected, (state) => {
            state.isLoading = false;
        });
    },
});
