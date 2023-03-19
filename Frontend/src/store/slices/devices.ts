import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FirmwareService } from '@services/firmware/firmware';

import { DeviceCreate, DevicesService, IDevice } from '../../services/devices/devices';

interface IDevicesState {
    devices: Array<IDevice>;
    currentDevice: IDevice | null;
    loading: boolean;
    createDevice: DeviceCreate | null;
    updateDevice: IDevice | null;
    showCreateDevice: boolean;
    showUpdateDevice: boolean;
    loadingUpdated: boolean;
    loadingCreate: boolean;
    loadingDelete: boolean;
    loadingFirmwareCreate: boolean;
    loadingFirmwareDelete: boolean;
    errorFlag: boolean | null;
}

const initialState: IDevicesState = {
    devices: [],
    currentDevice: null,
    loading: false,
    createDevice: null,
    updateDevice: null,
    showCreateDevice: false,
    showUpdateDevice: false,
    loadingUpdated: false,
    loadingCreate: false,
    loadingDelete: false,
    loadingFirmwareCreate: false,
    loadingFirmwareDelete: false,
    errorFlag: null,
};

export const getMyDevicesAsync = createAsyncThunk('devices/devices', async () => DevicesService.getMyDevices());
export const updateMyDevicesAsync = createAsyncThunk('devices/device/update', async (data: IDevice | null) =>
    data === null ? null : DevicesService.updateMyDevices(data)
);
export const createMyDevicesAsync = createAsyncThunk('devices/device/create', async (data: DeviceCreate | null) =>
    data === null ? null : DevicesService.createMyDevices(data)
);
export const deleteMyDevicesAsync = createAsyncThunk('devices/device/delete', async (data: IDevice | null) =>
    data === null ? null : DevicesService.deleteMyDevices(data)
);

export const createFirmwareAsync = createAsyncThunk('devices/device/firmware/create', async (deviceId: number) =>
    FirmwareService.createFirmware(deviceId)
);
export const deleteFirmwareAsync = createAsyncThunk('devices/device/firmware/delete', async (firmwareId: number) =>
    FirmwareService.deleteFirmware(firmwareId)
);

export const devicesReducer = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        startUpdateDevice: (state: IDevicesState, action: PayloadAction<IDevice>) => {
            state.showUpdateDevice = true;
            state.updateDevice = action.payload;
        },
        startCreateDevice: (state: IDevicesState) => {
            state.createDevice = new DeviceCreate(null);
            state.showCreateDevice = true;
        },
        setCurrentDevice: (state: IDevicesState, action: PayloadAction<IDevice>) => {
            state.currentDevice = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            /* Получение устройств */
            .addCase(getMyDevicesAsync.pending, state => {
                state.loading = true;
            })
            .addCase(getMyDevicesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.devices = action.payload ?? [];
            })
            .addCase(getMyDevicesAsync.rejected, (state, action) => {
                state.errorFlag = !state.errorFlag;
                state.loading = false;
            })

            /* Обновление устройства */
            .addCase(updateMyDevicesAsync.pending, state => {
                state.loadingUpdated = true;
            })
            .addCase(updateMyDevicesAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.devices = state.devices.map(device =>
                        device.id === action.payload?.id ? action.payload : device
                    );
                }
                state.loadingUpdated = false;
                state.updateDevice = null;
                state.showUpdateDevice = false;
            })
            .addCase(updateMyDevicesAsync.rejected, state => {
                state.errorFlag = !state.errorFlag;
                state.loadingUpdated = false;
            })

            /* Создание устройства */
            .addCase(createMyDevicesAsync.pending, state => {
                state.loadingCreate = true;
            })
            .addCase(createMyDevicesAsync.fulfilled, (state, action) => {
                if (action.payload) state.devices.push(action.payload);
                state.loadingCreate = false;
                state.createDevice = null;
                state.showCreateDevice = false;
            })
            .addCase(createMyDevicesAsync.rejected, state => {
                state.errorFlag = !state.errorFlag;
                state.loadingCreate = false;
            })

            /* Удаление устройства */
            .addCase(deleteMyDevicesAsync.pending, state => {
                state.loadingDelete = true;
            })
            .addCase(deleteMyDevicesAsync.fulfilled, (state, action) => {
                state.devices = state.devices.filter(device => device.id !== action.payload);
                state.loadingDelete = false;
            })
            .addCase(deleteMyDevicesAsync.rejected, state => {
                state.errorFlag = !state.errorFlag;
                state.loadingDelete = false;
            })

            /* Запрос на создание прошивки устройства */
            .addCase(createFirmwareAsync.pending, state => {
                state.loadingFirmwareCreate = true;
            })
            .addCase(createFirmwareAsync.fulfilled, (state, action) => {
                const payloadId = action.payload?.id;
                if (action.payload) {
                    state.devices = state.devices.map(device => (device.id === payloadId ? action.payload : device));
                    state.currentDevice = action.payload;
                }
                state.loadingFirmwareCreate = false;
            })
            .addCase(createFirmwareAsync.rejected, state => {
                state.errorFlag = !state.errorFlag;
                state.loadingFirmwareCreate = false;
            })

            /* Удалить прошивки устройства */
            .addCase(deleteFirmwareAsync.pending, state => {
                state.loadingFirmwareDelete = true;
            })
            .addCase(deleteFirmwareAsync.fulfilled, (state, action) => {
                const payloadId = action.payload?.id;
                if (action.payload) {
                    state.devices = state.devices.map(device => (device.id === payloadId ? action.payload : device));
                    state.currentDevice = action.payload;
                }
                state.loadingFirmwareDelete = false;
            })
            .addCase(deleteFirmwareAsync.rejected, state => {
                state.errorFlag = !state.errorFlag;
                state.loadingFirmwareDelete = false;
            });
    },
});

export const { startUpdateDevice, startCreateDevice, setCurrentDevice } = devicesReducer.actions;
export default devicesReducer.reducer;
