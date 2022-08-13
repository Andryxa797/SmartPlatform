import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from './slices/auth'
import appReducer from './slices/app'

const rootReducer = combineReducers({
    authReducer,
    appReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore  = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']