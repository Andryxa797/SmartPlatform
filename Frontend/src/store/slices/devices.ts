import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DevicesService, IDevice } from "../../services/devices/devices";


interface IDevicesState {
    devices: Array<IDevice>;
    loading: boolean;
    createDevice: IDevice | null;
    updateDevice: IDevice | null;
    showCreateDevice: boolean
    showUpdateDevice: boolean
}

const initialState: IDevicesState = {
    devices: [],
    loading: false,
    createDevice: null,
    updateDevice: null,
    showCreateDevice: false,
    showUpdateDevice: false,
}



export const getMyDevicesAsync = createAsyncThunk("devices/devices", async () => DevicesService.getMyDevices())

export const devicesReducer = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        startUpdateDevice: (state: IDevicesState, action: PayloadAction<IDevice>)=> {
            state.showUpdateDevice = true;
            state.updateDevice = action.payload
        },
        endUpdateDevice: (state: IDevicesState, action: PayloadAction<IDevice | null>)=> {
            state.showUpdateDevice = false;
            if(action.payload === null)
                state.updateDevice = null
            else console.log("Нужно отправить на сервер")
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyDevicesAsync.pending, (state) => { state.loading = true })
            .addCase(getMyDevicesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.devices = action.payload ?? []
            })
            .addCase(getMyDevicesAsync.rejected, (state, action) => {
                console.log("state.devices", state.devices);
                state.loading = false;
            })
    }
})

export const {startUpdateDevice, endUpdateDevice} = devicesReducer.actions
export default devicesReducer.reducer;