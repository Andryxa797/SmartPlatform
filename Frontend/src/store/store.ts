import { combineReducers, configureStore } from '@reduxjs/toolkit';

import app from './slices/app';
import auth from './slices/auth';
import devices from './slices/devices';

const rootReducer = combineReducers({
    auth,
    app,
    devices,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
