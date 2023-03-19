import { API } from '@services/base';
import { IDevice } from '@services/devices/devices';

export interface IFirmware {
    id: number;
    device: number;
    success: boolean;
    create_date: string;
    programm: string;
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
