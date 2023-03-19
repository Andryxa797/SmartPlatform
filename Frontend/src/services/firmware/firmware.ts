import { IDevice } from '@services/devices/devices';

import { API } from '../base';

export interface IFirmware {
    id: number;
    device: number;
    status: 'success' | 'loading' | 'error';
    create_date: string;
    programm: string;
    programm_absolute_url: string;
}

export class FirmwareService {
    static createFirmware(deviceId: number): Promise<IDevice> {
        return API.post(`/api/firmware/`, { id: deviceId })
            .then(response => {
                if (response.status !== 201) throw new TypeError();
                return response.data;
            })
            .catch(() => {
                throw new TypeError();
            });
    }

    static deleteFirmware(firmwareId: number): Promise<IDevice> {
        return API.delete(`/api/firmware/`, { params: { 'id-firmware': firmwareId } })
            .then(response => {
                if (response.status !== 202) throw new TypeError();
                return response.data;
            })
            .catch(() => {
                throw new TypeError();
            });
    }
}
