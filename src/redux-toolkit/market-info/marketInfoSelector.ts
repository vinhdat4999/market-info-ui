import {RootState} from "../../store";

export const getMarketInfoState = (state: RootState) => state.marketInfo;
export const getIsLoadingState = (state: RootState) => getMarketInfoState(state).isLoading;
export const getMarketDataState = (state: RootState) => getMarketInfoState(state).data;
