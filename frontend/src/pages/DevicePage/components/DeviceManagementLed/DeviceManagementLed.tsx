import { useEffect, useState } from 'react';
import { ReadyState, SendMessage } from 'react-use-websocket';

import { Button, Switch } from 'antd';

import { space } from '@constants/constants';
import { deviceManagementLedStyle as cls } from '@pages/DevicePage/components/DeviceManagementLed/DeviceManagementLed.const';

import { IDevice } from '../../../../services/devices/devices';
import './DeviceManagementLed.scss';

interface ILedDeviceManagement {
    device: IDevice;
    readyState: ReadyState;
    isConnectedDevice: boolean;
    lastMessage: MessageEvent<any> | null;
    sendMessage: SendMessage;
    setIsConnectedDevice: (isConnect: boolean) => void;
}
interface IMessageWebSocket {
    message: string;
}
export const DeviceManagementLed = ({
    isConnectedDevice,
    sendMessage,
    lastMessage,
    setIsConnectedDevice,
}: ILedDeviceManagement) => {
    const [messageHistory, setMessageHistory] = useState<Array<any>>([]);
    const [loadingDeviceCommand, setLoadingDeviceCommand] = useState(false);
    const [ledStationD18, setLedStationD18] = useState(false);
    const [ledStationD19, setLedStationD19] = useState(false);
    const [ledStationD21, setLedStationD21] = useState(false);

    useEffect(() => {
        if (lastMessage && lastMessage.data) {
            const message: IMessageWebSocket = JSON.parse(lastMessage.data);
            setMessageHistory(prev => prev.concat(lastMessage));
            if (message.message === 'device connect') setIsConnectedDevice(true);
            if (message.message === 'device disconnect') setIsConnectedDevice(true);
            if (message.message === 'OK') {
                setLoadingDeviceCommand(false);
                setIsConnectedDevice(true);
            }
        }
    }, [lastMessage, setMessageHistory]);

    const handleClickMenageStateD18 = (isTurnOn: boolean) => {
        setLoadingDeviceCommand(true);
        if (isTurnOn) sendMessage('ON_D18');
        if (!isTurnOn) sendMessage('OFF_D18');
        setLedStationD18(isTurnOn);
    };
    const handleClickMenageStateD19 = (isTurnOn: boolean) => {
        setLoadingDeviceCommand(true);
        if (isTurnOn) sendMessage('ON_D19');
        if (!isTurnOn) sendMessage('OFF_D19');
        setLedStationD19(isTurnOn);
    };
    const handleClickMenageStateD21 = (isTurnOn: boolean) => {
        setLoadingDeviceCommand(true);
        if (isTurnOn) sendMessage('ON_D21');
        if (!isTurnOn) sendMessage('OFF_D21');
        setLedStationD21(isTurnOn);
    };

    const handleClickSosState = () => {
        setLoadingDeviceCommand(true);
        sendMessage('SOS');
        setLedStationD18(false);
        setLedStationD19(false);
        setLedStationD21(false);
    };

    const handleClickSONGState = () => {
        setLoadingDeviceCommand(true);
        sendMessage('SONG');
        setLedStationD18(false);
        setLedStationD19(false);
        setLedStationD21(false);
    };

    const handleClickFastSnakeState = () => {
        setLoadingDeviceCommand(true);
        sendMessage('FAST_SNAKE');
        setLedStationD18(false);
        setLedStationD19(false);
        setLedStationD21(false);
    };
    const handleClickSlowSnakeState = () => {
        setLoadingDeviceCommand(true);
        sendMessage('SLOW_SNAKE');
        setLedStationD18(false);
        setLedStationD19(false);
        setLedStationD21(false);
    };

    return (
        <div className={cls.root}>
            <div className={cls.title}>Управление устройством</div>
            <div className={cls.stationConnect}>
                Включение светодиода (D18):{space}
                <span className={cls.stationConnectState}>
                    <Switch
                        disabled={!isConnectedDevice}
                        loading={loadingDeviceCommand}
                        checked={ledStationD18}
                        onChange={handleClickMenageStateD18}
                    />
                </span>
            </div>
            <div className={cls.stationConnect}>
                Включение светодиода (D19):{space}
                <span className={cls.stationConnectState}>
                    <Switch
                        disabled={!isConnectedDevice}
                        loading={loadingDeviceCommand}
                        checked={ledStationD19}
                        onChange={handleClickMenageStateD19}
                    />
                </span>
            </div>
            <div className={cls.stationConnect}>
                Включение светодиода (D21):{space}
                <span className={cls.stationConnectState}>
                    <Switch
                        disabled={!isConnectedDevice}
                        loading={loadingDeviceCommand}
                        checked={ledStationD21}
                        onChange={handleClickMenageStateD21}
                    />
                </span>
            </div>
            <div className={cls.title}>Команды управления:</div>
            <div className={cls.buttonsWrapper}>
                <Button
                    className={cls.button}
                    disabled={!isConnectedDevice}
                    loading={loadingDeviceCommand}
                    onClick={handleClickSosState}
                >
                    Азбука морзе (SOS)
                </Button>
                <Button
                    className={cls.button}
                    disabled={!isConnectedDevice}
                    loading={loadingDeviceCommand}
                    onClick={handleClickSONGState}
                >
                    Мелодия песни
                </Button>
            </div>
            <div className={cls.buttonsWrapper}>
                <Button
                    className={cls.button}
                    disabled={!isConnectedDevice}
                    loading={loadingDeviceCommand}
                    onClick={handleClickFastSnakeState}
                >
                    Быстрая змейка
                </Button>
                <Button
                    className={cls.button}
                    disabled={!isConnectedDevice}
                    loading={loadingDeviceCommand}
                    onClick={handleClickSlowSnakeState}
                >
                    Медленная змейка
                </Button>
            </div>
        </div>
    );
};
