import { Switch } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { IDevice } from '../../../services/devices/devices';

interface ILedDeviceManagement {
    device: IDevice;
}
interface IMessageWebSocket{
    message: string;
}
export const LedDeviceManagement = ({ device }: ILedDeviceManagement) => {
    const [messageHistory, setMessageHistory] = useState<Array<any>>([]);
    const [isConnectedDevice, setIsConnectedDevice] = useState(false)
    const [loadingDeviceCommand, setLoadingDeviceCommand] = useState(false)
    const [ledStation, setLedStation] = useState(false)

    const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://localhost:8000/ws/device/${device.id}`, {
        queryParams: {
            "_access": `|${localStorage.getItem("_access")}|`,
            "_refresh": `|${localStorage.getItem("_refresh")}|`,
        }
    });

    useEffect(() => {
        if (lastMessage && lastMessage.data) {
            const message: IMessageWebSocket = JSON.parse(lastMessage.data)
            setMessageHistory((prev) => prev.concat(lastMessage))
            if (message.message === "device connect") {
                setIsConnectedDevice(true)
            }
            if (message.message === "OK") {
                setLoadingDeviceCommand(false)
            }
        }
    }, [lastMessage, setMessageHistory]);



    // const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

    const handleClickMenageState = (state: boolean)=> {
        setLoadingDeviceCommand(true)
        sendMessage("ON")
        setLedStation(state)

    }

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Соединение',
        [ReadyState.OPEN]: 'Готово к использованию',
        [ReadyState.CLOSING]: 'Закрытие',
        [ReadyState.CLOSED]: 'Закрыто',
        [ReadyState.UNINSTANTIATED]: 'Деинсталлированный',
    }[readyState];

    return (
        <div>
            {/* <button
                onClick={handleClickSendMessage}
                disabled={readyState !== ReadyState.OPEN}
            >
                Click Me to send 'Hello'
            </button>
            <span>The WebSocket is currently {connectionStatus}</span>
            {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
            <ul>
                {messageHistory.map((message, idx) => (
                    <span key={idx}>{message ? message.data : null}</span>
                ))}
            </ul> */}
            <div>Текущие состояние соединение с сервером: {connectionStatus}</div>
            {isConnectedDevice ? <div>Девайс подключен к сети</div> : <div>Девайс отсутствует</div>}
            <Switch disabled={!isConnectedDevice} loading={loadingDeviceCommand} checked={ledStation} onChange={handleClickMenageState}/>
        </div>
    );
};