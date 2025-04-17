import {createSlice} from '@reduxjs/toolkit';

export const initialState: any = {
    cartItems: JSON.parse(localStorage.getItem('cart') ?? '[]'),
    quantityInCart: 0,
    validCoinUse: 0,
};

export interface CartItem {
    productId: string;
    quantityInCart: number;
    validCoinUse: number;
}

const saveCartToLocalStorage = (cart: CartItem[]): void => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setValidCoinUse(state, payload: any) {
            state.validCoinUse = payload.payload;
            saveCartToLocalStorage(state.cartItems);
        },
        clearCart(state) {
            state.cartItems = [];
            state.validCoinUse = 0;
            saveCartToLocalStorage(state.cartItems);
        },
        removeCartItem(state, payload: any): void {
            const productId = payload.payload.productId;
            state.validCoinUse = 0;
            state.cartItems = state.cartItems.filter((item: CartItem) => item.productId !== productId);
            saveCartToLocalStorage(state.cartItems);
        },
        addCartItem(state, payload): void {
            const productId = payload.payload.productId;
            const quantityInCart = payload.payload.quantity;

            const existingItem = state.cartItems.find((item: CartItem) => item.productId === productId);

            if (existingItem) {
                existingItem.quantityInCart += quantityInCart;
            } else {
                state.cartItems.push({productId, quantityInCart});
            }
            saveCartToLocalStorage(state.cartItems);
        },
    },
    extraReducers: (builder): void => {
    },
});

export const {setValidCoinUse, clearCart, removeCartItem, addCartItem} = cartSlice.actions;
export default cartSlice.reducer;
