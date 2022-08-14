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
export class DevicesService {
    static getMyDevices(): Promise<Array<IDevice> | null> {
        return API.get<Array<IDevice>>('/api/accounts/devices/')
            .then((value) => value.data)
            .catch(() => {
                console.log("Ошибка загрузки устройств!")
                return null
            })
    }
}