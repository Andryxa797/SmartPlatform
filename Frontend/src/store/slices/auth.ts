import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService } from "../../services/Auth/Auth";

interface IAuth {
    isLogin: boolean;
    loading: boolean;
}

const initialState: IAuth = {
    isLogin: false,
    loading: false,
};

export const loginAsync = createAsyncThunk("auth/login", async (data: { username: string; password: string }) => {
    return AuthService.login(data.username, data.password);
});

export const refreshAsync = createAsyncThunk(
    "auth/refresh",
    async () => {
        return AuthService.refresh();
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state: IAuth) => {
            state.isLogin = true;
        },
        logout: (state: IAuth) => {
            state.isLogin = false;
            localStorage.removeItem("_access");
            localStorage.removeItem("_refresh");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.statusCode === 200) {
                    state.isLogin = true;
                    console.log("action.payload.tokens.refresh ", action.payload.tokens.refresh);
                    
                    localStorage.setItem("_access", action.payload.tokens.access);
                    localStorage.setItem("_refresh", action.payload.tokens.refresh);
                } else {
                    state.isLogin = false;
                    localStorage.removeItem("_access");
                    localStorage.removeItem("_refresh");
                }
            })
            .addCase(loginAsync.rejected, (state) => {
                state.loading = true;
            })
            .addCase(refreshAsync.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.statusCode === 200) {
                    state.isLogin = true;
                    console.log("action.payload.tokens ", action.payload.tokens);
                    
                    localStorage.setItem("_access", action.payload.tokens.access);
                    // localStorage.setItem("_refresh", action.payload.tokens.refresh);
                } else {
                    state.isLogin = false;
                    localStorage.removeItem("_access");
                    localStorage.removeItem("_refresh");
                }
            })
    },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
