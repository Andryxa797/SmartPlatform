import { useEffect } from 'react';
import { ReadyState, SendMessage } from 'react-use-websocket';

import { CheckCircleOutlined } from '@ant-design/icons';
import { space } from '@constants/constants';
import { deviceStationConnectStyle as cls } from '@pages/DevicePage/components/DeviceStationConnect/DeviceStationConnect.const';

import './DeviceStationConnect.scss';

export interface IDeviceStationConnect {
    readyState: ReadyState;
    isConnectedDevice: boolean;
    sendMessage: SendMessage;
}
export const DeviceStationConnect = ({ readyState, isConnectedDevice, sendMessage }: IDeviceStationConnect) => {
    useEffect(() => {
        if (readyState == ReadyState.OPEN) {
            sendMessage('user connect');
        }
    }, [readyState]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Соединение',
        [ReadyState.OPEN]: 'Открыто',
        [ReadyState.CLOSING]: 'Закрытие',
        [ReadyState.CLOSED]: 'Закрыто',
        [ReadyState.UNINSTANTIATED]: 'Деинсталлированный',
    }[readyState];

    return (
        <div className={cls.root}>
            <div className={cls.title}>Состояние устройства</div>
            <div className={cls.stationConnect}>
                Соединение с сервером:{space}
                <span className={cls.stationConnectState}>{connectionStatus}</span>
            </div>
            <div className={cls.stationConnect}>
                Готовность устройства:
                <span className={cls.stationConnectState}>
                    {isConnectedDevice ? (
                        <span>
                            {space}
                            <CheckCircleOutlined color="success" /> девайс готов
                        </span>
                    ) : (
                        <span>
                            {space}
                            <CheckCircleOutlined color="error" /> девайс отсутствует
                        </span>
                    )}
                </span>
            </div>
        </div>
    );
};
