import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { refreshAsync } from './auth';
import { getMyDevicesAsync } from './devices';

interface IInitialState {
    initApp: boolean;
    loading: boolean;
}

const initialState: IInitialState = {
    initApp: false,
    loading: true,
};

export const initAppAsync = createAsyncThunk('app/init', async (_, thunkAPI) => {
    await thunkAPI.dispatch(refreshAsync());

    const state = thunkAPI.getState() as RootState;

    if (state?.auth?.isLogin) {
        await thunkAPI.dispatch(getMyDevicesAsync());
    }
});

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        reinitializeApp: (state: IInitialState) => {
            state.initApp = false;
            state.loading = true;
        },
    },
    extraReducers: builder => {
        builder.addCase(initAppAsync.fulfilled, state => {
            state.initApp = true;
            state.loading = false;
        });
        builder.addCase(initAppAsync.rejected, state => {
            state.initApp = true;
            state.loading = false;
        });
    },
});

export default appSlice.reducer;
export const { reinitializeApp } = appSlice.actions;
