import { useEffect } from 'react';

import { notification } from 'antd';

import { homePageStyle as cls } from '@pages/HomePage/HomePage.const';
import { HomeDeviceCard } from '@pages/HomePage/components/HomeDeviceCard/HomeDeviceCard';
import { HomeModalDeviceCreate } from '@pages/HomePage/components/HomeModalDeviceCreate/HomeModalDeviceCreate';
import { HomeModalDeviceUpdate } from '@pages/HomePage/components/HomeModalDeviceUpdate/HomeModalDeviceUpdate';
import { useAppSelector } from '@store/hooks/hooks';

import './HomePage.scss';

export const HomePage = () => {
    const { devices, errorFlag, showCreateDevice, showUpdateDevice } = useAppSelector(reducer => reducer.devices);

    useEffect(() => {
        if (errorFlag !== null) {
            notification.error({ message: 'Произошла ошибка!' });
        }
    }, [errorFlag]);

    return (
        <>
            <div className={cls.root}>
                <div className={cls.title}>Доступные устройства</div>
            </div>
            <div className={cls.cardDevices}>
                {devices.map(device => (
                    <HomeDeviceCard key={device.id} device={device} />
                ))}
                <HomeDeviceCard />
            </div>
            {showUpdateDevice && <HomeModalDeviceUpdate />}
            {showCreateDevice && <HomeModalDeviceCreate />}
        </>
    );
};
