import {createAsyncThunk} from '@reduxjs/toolkit';
import requestService from '../../utils/requestService';
import {MARKET_INFO_URL} from "../../constants/urlConstants";

export const getMarketInfo = createAsyncThunk(
    'marketInfo/getMarketInfo',
    async (_, {rejectWithValue}) => {
        try {
            return await requestService.get(MARKET_INFO_URL, false);
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            throw error;
        }
    }
);
