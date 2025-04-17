import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from './redux-toolkit/user/userSlice';
import {productSlice} from "./redux-toolkit/product/productSlice";
import {orderSlice} from "./redux-toolkit/order/orderSlice";
import {cartSlice} from "./redux-toolkit/cart/cartSlice";
import {customerSlice} from "./redux-toolkit/customer/customerSlice";


export const storeReducer = {
    user: userSlice.reducer,
    product: productSlice.reducer,
    order: orderSlice.reducer,
    cart: cartSlice.reducer,
    customer: customerSlice.reducer,
};

export const store = configureStore({
    reducer: storeReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
