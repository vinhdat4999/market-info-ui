import {RootState} from "../../store";

export const getCartUserState = (state: RootState) => state.cart;
export const getCartItemsState = (state: RootState) => getCartUserState(state).cartItems;
export const getValidCoinUseState = (state: RootState) => getCartUserState(state).validCoinUse;
