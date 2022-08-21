import { API } from "../base";

export enum DeviceType {
    LED = "LED"
}
export interface IDevice {
    id: number;
    owner: number;
    uuid_public: string;
    uuid_private: string;
    name: string;
    avatar: string | null;
    create_date: string;
    type: DeviceType;
    wifi_name: string;
    wifi_password: string;
}
export class DeviceCreate {
    name: string;
    type: DeviceType;
    wifi_name: string;
    wifi_password: string;
    constructor(state: DeviceCreate | null) {
        this.name = state?.name ?? " "
        this.type = state?.type ?? DeviceType.LED
        this.wifi_name = state?.wifi_name ?? " "
        this.wifi_password = state?.wifi_password ?? " "
    }
}
export class DevicesService {
    static getMyDevices(): Promise<Array<IDevice>> {
        return API.get<Array<IDevice>>('/api/accounts/devices/')
            .then((response) => {
                if (response.status !== 200) throw new TypeError();
                return response.data
            })
            .catch((e) => {
                console.log("Ошибка загрузки устройств!")
                throw new TypeError()
            })
    }
    static updateMyDevices(device: IDevice): Promise<IDevice> {
        return API.put<IDevice>(`/api/accounts/device/${device.id}`, { ...device })
            .then((response) => {
                if (response.status !== 200) throw new TypeError();
                return response.data
            })
            .catch(() => {
                console.log("Ошибка загрузки устройств!")
                throw new TypeError()
            })
    }
    static createMyDevices(device: DeviceCreate): Promise<IDevice> {
        return API.post<IDevice>(`/api/accounts/device/`, { ...device })
            .then((response) => {
                if (response.status !== 201) throw new TypeError();
                return response.data
            })
            .catch(() => {
                console.log("Ошибка загрузки устройств!")
                throw new TypeError()
            })
    }
    static deleteMyDevices(device: IDevice): Promise<number> {
        return API.delete<IDevice>(`/api/accounts/device/${device.id}`)
            .then((response) => {
                if (response.status !== 204) throw new TypeError();
                return device.id
            })
            .catch(() => {
                console.log("Ошибка загрузки устройств!")
                throw new TypeError()
            })
    }
}