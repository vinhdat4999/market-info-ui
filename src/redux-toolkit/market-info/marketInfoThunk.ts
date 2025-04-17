import {createAsyncThunk} from '@reduxjs/toolkit';
import {CREATE_CUSTOMER, CUSTOMER_PHONE} from '../../constants/urlConstants';
import requestService from '../../utils/requestService';

export const getCustomerByPhone = createAsyncThunk(
    'customer/getCustomerByPhone',
    async (phoneNumber: any, {rejectWithValue}) => {
        try {
            return await requestService.get(CUSTOMER_PHONE + phoneNumber, true);
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            throw error;
        }
    }
);

export const createCustomer = createAsyncThunk(
    'customer/createCustomer',
    async ({phoneNumber, name, address, email, birthday}: any, {rejectWithValue}) => {
        try {
            const body = {
                phoneNumber: phoneNumber,
                name: name,
                address: address,
                email: email,
                birthday: birthday,
            }
            return await requestService.post(CREATE_CUSTOMER, body, true);
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            }
            throw error;
        }
    }
);
