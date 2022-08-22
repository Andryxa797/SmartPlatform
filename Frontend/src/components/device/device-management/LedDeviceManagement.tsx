import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Switch } from 'antd';
import { useState, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { IDevice } from '../../../services/devices/devices';

interface ILedDeviceManagement {
    device: IDevice;
}
interface IMessageWebSocket {
    message: string;
}
export const LedDeviceManagement = ({ device }: ILedDeviceManagement) => {
    const [messageHistory, setMessageHistory] = useState<Array<any>>([]);
    const [isConnectedDevice, setIsConnectedDevice] = useState(false)
    const [loadingDeviceCommand, setLoadingDeviceCommand] = useState(false)
    const [ledStationD18, setLedStationD18] = useState(false)
    const [ledStationD19, setLedStationD19] = useState(false)
    const [ledStationD21, setLedStationD21] = useState(false)

    const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://192.168.0.106:8000/ws/device/${device.id}`, {
        queryParams: {
            "_access": `|${localStorage.getItem("_access")}|`,
            "_refresh": `|${localStorage.getItem("_refresh")}|`,
        }
    });
    useEffect(() => {
        if (readyState == ReadyState.OPEN) sendMessage("user connect")
    }, [readyState]);

    useEffect(() => {
        if (lastMessage && lastMessage.data) {
            const message: IMessageWebSocket = JSON.parse(lastMessage.data)
            setMessageHistory((prev) => prev.concat(lastMessage))
            if (message.message === "device connect") setIsConnectedDevice(true)
            if (message.message === "device disconnect") setIsConnectedDevice(true)
            if (message.message === "OK") {
                setLoadingDeviceCommand(false)
                setIsConnectedDevice(true)
            }
        }
    }, [lastMessage, setMessageHistory]);


    const handleClickMenageStateD18 = (isTurnOn: boolean) => {
        setLoadingDeviceCommand(true)
        if (isTurnOn) sendMessage("ON_D18")
        if (!isTurnOn) sendMessage("OFF_D18")
        setLedStationD18(isTurnOn)
    }
    const handleClickMenageStateD19 = (isTurnOn: boolean) => {
        setLoadingDeviceCommand(true)
        if (isTurnOn) sendMessage("ON_D19")
        if (!isTurnOn) sendMessage("OFF_D19")
        setLedStationD19(isTurnOn)
    }
    const handleClickMenageStateD21 = (isTurnOn: boolean) => {
        setLoadingDeviceCommand(true)
        if (isTurnOn) sendMessage("ON_D21")
        if (!isTurnOn) sendMessage("OFF_D21")
        setLedStationD21(isTurnOn)
    }

    const handleClickSosState = () => {
        setLoadingDeviceCommand(true)
        sendMessage("SOS")
        setLedStationD18(false)
        setLedStationD19(false)
        setLedStationD21(false)
    }

    const handleClickSONGState = () => {
        setLoadingDeviceCommand(true)
        sendMessage("SONG")
        setLedStationD18(false)
        setLedStationD19(false)
        setLedStationD21(false)
    }


    const handleClickFastSnakeState = () => {
        setLoadingDeviceCommand(true)
        sendMessage("FAST_SNAKE")
        setLedStationD18(false)
        setLedStationD19(false)
        setLedStationD21(false)
    }
    const handleClickSlowSnakeState = () => {
        setLoadingDeviceCommand(true)
        sendMessage("SLOW_SNAKE")
        setLedStationD18(false)
        setLedStationD19(false)
        setLedStationD21(false)
    }

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Соединение',
        [ReadyState.OPEN]: 'Открыто',
        [ReadyState.CLOSING]: 'Закрытие',
        [ReadyState.CLOSED]: 'Закрыто',
        [ReadyState.UNINSTANTIATED]: 'Деинсталлированный',
    }[readyState];

    return (
        <div className='device-page-management__wrapper'>
            <div className="device-page-info-management__title-wrapper">
                <div className="device-page-info-management__title">Управление устройством</div>
            </div>
            <div className="device-page-info-management__station-connect-wrapper">
                <div className="device-page-info-management__station-connect">Соединение с сервером: <span className='device-page-info-management__station-connect-state'>
                    {connectionStatus}
                </span>
                </div>
            </div>
            <div className="device-page-info-management__station-connect-wrapper">
                <div className="device-page-info-management__station-connect">Готовность устройства: <span className='device-page-info-management__station-connect-state'>
                    {isConnectedDevice ? <><CheckCircleOutlined color='success'/>девайс готов</> : <><CheckCircleOutlined color='error'/>девайс отсутствует</>}
                </span>
                </div>
            </div>
            <div className="device-page-info-management__station-connect-wrapper">
                <div className="device-page-info-management__station-connect">Включение светодиода (D18): <span className='device-page-info-management__station-connect-state'>
                    <Switch disabled={!isConnectedDevice} loading={loadingDeviceCommand} checked={ledStationD18} onChange={handleClickMenageStateD18} />
                </span>
                </div>
            </div>
            <div className="device-page-info-management__station-connect-wrapper">
                <div className="device-page-info-management__station-connect">Включение светодиода (D19): <span className='device-page-info-management__station-connect-state'>
                    <Switch disabled={!isConnectedDevice} loading={loadingDeviceCommand} checked={ledStationD19} onChange={handleClickMenageStateD19} />
                </span>
                </div>
            </div>
            <div className="device-page-info-management__station-connect-wrapper">
                <div className="device-page-info-management__station-connect">Включение светодиода (D21): <span className='device-page-info-management__station-connect-state'>
                    <Switch disabled={!isConnectedDevice} loading={loadingDeviceCommand} checked={ledStationD21} onChange={handleClickMenageStateD21} />
                </span>
                </div>
            </div>
            <div className="device-page-info-management__station-connect-wrapper">
                <div className="device-page-info-management__station-connect">Команды управления: </div>
            </div>
            <div className='device-page-info-management__buttons-wrapper'>
                <Button className='device-page-info-management__buttons' disabled={!isConnectedDevice} loading={loadingDeviceCommand} onClick={handleClickSosState}>Азбука морзе (SOS)</Button>
                <Button className='device-page-info-management__buttons' disabled={!isConnectedDevice} loading={loadingDeviceCommand} onClick={handleClickSONGState}>Мелодия песни</Button>
            </div>
            <div className='device-page-info-management__buttons-wrapper'>
                <Button className='device-page-info-management__buttons' disabled={!isConnectedDevice} loading={loadingDeviceCommand} onClick={handleClickFastSnakeState}>Быстрая змейка</Button>
                <Button className='device-page-info-management__buttons' disabled={!isConnectedDevice} loading={loadingDeviceCommand} onClick={handleClickSlowSnakeState}>Медленная змейка</Button>
            </div>
        </div>
    );
};