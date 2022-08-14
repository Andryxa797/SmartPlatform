import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService } from "../../services/auth/auth";

interface IAuth {
    isLogin: boolean;
    loading: boolean;
    state: 'Init' | "Pending" | "Error" | "BadPassword";
}

const initialState: IAuth = {
    isLogin: false,
    loading: false,
    state: 'Init',
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
                state.state = "Pending"
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                
                if (action.payload?.statusCode === 200) {
                    state.isLogin = true;
                    state.state = "Init"
                    localStorage.setItem("_access", action.payload.tokens.access);
                    localStorage.setItem("_refresh", action.payload.tokens.refresh);
                } else {
                    state.isLogin = false;
                    localStorage.removeItem("_access");
                    localStorage.removeItem("_refresh");
                    state.state = "BadPassword"
                }
            })
            .addCase(loginAsync.rejected, (state) => {
                state.loading = true;
                state.state = "Error"
                console.log("Error")
            })
            .addCase(refreshAsync.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.statusCode === 200) {
                    state.isLogin = true;
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
export const { logout } = authSlice.actions;
