import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';

import { devicePageStyle as cls } from '@pages/DevicePage/DevicePage.const';
import { DeviceInfoGeneral } from '@pages/DevicePage/components/DeviceInfoGeneral/DeviceInfoGeneral';
import { DeviceManagementLed } from '@pages/DevicePage/components/DeviceManagementLed/DeviceManagementLed';
import { DeviceStationConnect } from '@pages/DevicePage/components/DeviceStationConnect/DeviceStationConnect';
import { useAppDispatch, useAppSelector } from '@store/hooks/hooks';
import { setCurrentDevice } from '@store/slices/devices';

import './DevicePage.scss';

export const DevicePage = () => {
    const { id } = useParams();
    const { devices, currentDevice: device } = useAppSelector(reducers => reducers.devices);
    const dispatch = useAppDispatch();

    const [isConnectedDevice, setIsConnectedDevice] = useState(false);

    const { sendMessage, lastMessage, readyState } = useWebSocket(`ws://192.168.0.106:8000/ws/device/${device?.id}`, {
        queryParams: {
            _access: `|${localStorage.getItem('_access')}|`,
            _refresh: `|${localStorage.getItem('_refresh')}|`,
        },
    });

    useEffect(() => {
        const current = devices.filter(dev => dev.id === Number(id))[0];
        dispatch(setCurrentDevice(current));
    }, [id, devices]);

    return device ? (
        <div className={cls.root}>
            <div className={cls.info}>
                <DeviceInfoGeneral device={device} />
            </div>
            <div>
                <DeviceStationConnect
                    isConnectedDevice={isConnectedDevice}
                    readyState={readyState}
                    sendMessage={sendMessage}
                />
            </div>
            <div className="device-page-info__container ">
                <DeviceManagementLed
                    device={device}
                    isConnectedDevice={isConnectedDevice}
                    readyState={readyState}
                    lastMessage={lastMessage}
                    sendMessage={sendMessage}
                    setIsConnectedDevice={setIsConnectedDevice}
                />
            </div>
        </div>
    ) : (
        <>Страница не найдена</>
    );
};
