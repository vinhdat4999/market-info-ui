import {configureStore} from '@reduxjs/toolkit';
import {marketInfoSlice} from "./redux-toolkit/market-info/marketInfoSlice";


export const storeReducer = {
    marketInfo: marketInfoSlice.reducer,
};

export const store = configureStore({
    reducer: storeReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
