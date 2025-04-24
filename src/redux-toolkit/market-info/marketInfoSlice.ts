import {createSlice} from '@reduxjs/toolkit';
import {getMarketInfo} from "./marketInfoThunk";

export const initialState: any = {
    isLoading: false,
    data: {},
    error: '',
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
            state.error = null;
        });
        builder.addCase(getMarketInfo.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Xảy ra lỗi khi lấy dữ liệu';
        });
    },
});
