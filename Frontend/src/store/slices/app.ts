import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { refreshAsync } from "./auth";

const initialState = {
  initApp: false,
  loading: true,
};

export const initAppAsync = createAsyncThunk("app/init", async (_, thunkAPI) => {
        await thunkAPI.dispatch(refreshAsync())
});
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initAppAsync.fulfilled, (state)=> {
        state.initApp = true
        state.loading = false
    })
    builder.addCase(initAppAsync.rejected, (state)=> {
        state.initApp = true
        state.loading = false
    })
  },
});

export default appSlice.reducer;
