import { useState } from 'react';

import { Button, Input, Typography, message } from 'antd';

import { CopyOutlined } from '@ant-design/icons';
import { DeviceFrimwareModal } from '@pages/DevicePage/components/DeviceFrimwareModal/DeviceFrimwareModal';
import { deviceInfoGeneralStyle as cls } from '@pages/DevicePage/components/DeviceInfoGeneral/DeviceInfoGeneral.const';
import { HomeModalDeviceUpdate } from '@pages/HomePage/components/HomeModalDeviceUpdate/HomeModalDeviceUpdate';
import { useAppDispatch, useAppSelector } from '@store/hooks/hooks';
import { startUpdateDevice } from '@store/slices/devices';
import { formattedDateString } from '@utils/formattedDateString';

import { IDevice } from '../../../../services/devices/devices';
import './DeviceInfoGeneral.scss';

const { Title } = Typography;

export interface IDeviceInfoGeneral {
    device: IDevice;
}
export const DeviceInfoGeneral = ({ device }: IDeviceInfoGeneral) => {
    const dispatch = useAppDispatch();

    const { showUpdateDevice } = useAppSelector(reducer => reducer.devices);

    const handleClickCopy = (value: string) => {
        navigator.clipboard.writeText(value);
        message.success('Успешно скопировано');
    };
    const [visible, setVisible] = useState(false);

    return (
        <div className={cls.root}>
            <span>
                <div className={cls.title}>{device.name}</div>
                <div className={cls.date}>({formattedDateString({ date: device.create_date })})</div>
            </span>
            <div className={cls.row}>
                <Title level={5}>Тип устройства:</Title>
                <div className={cls.inputGroup}>Управление светодиодом</div>
            </div>
            <div className={cls.row}>
                <Title level={5}>Название Wi-Fi сети:</Title>
                <div className={cls.inputGroup}>
                    <Input value={device.wifi_name} />
                    <Button icon={<CopyOutlined />} onClick={() => handleClickCopy(device.wifi_name)} />
                </div>
            </div>
            <div className={cls.row}>
                <Title level={5}>Пароль Wi-Fi сети:</Title>
                <div className={cls.inputGroup}>
                    <Input.Password value={device.wifi_password} />
                    <Button icon={<CopyOutlined />} onClick={() => handleClickCopy(device.wifi_password)} />
                </div>
            </div>
            <div className={cls.row}>
                <Title level={5}>Публичный ключ:</Title>
                <div className={cls.inputGroup}>
                    <Input.Password value={device.uuid_public} />
                    <Button icon={<CopyOutlined />} onClick={() => handleClickCopy(device.uuid_public)} />
                </div>
            </div>
            <div className={cls.row}>
                <Title level={5}>Приватный ключ:</Title>
                <div className={cls.inputGroup}>
                    <Input.Password value={device.uuid_private} />
                    <Button icon={<CopyOutlined />} onClick={() => handleClickCopy(device.uuid_private)} />
                </div>
            </div>
            <div className={cls.row}>
                <Title level={5}>Тип устройства:</Title>
                <div className={cls.inputGroup}>
                    <Input.Password value={device.uuid_private} />
                    <Button icon={<CopyOutlined />} onClick={() => handleClickCopy(device.uuid_private)} />
                </div>
            </div>
            <div className={cls.buttonGroup}>
                <Button className={cls.button} type="primary" onClick={() => dispatch(startUpdateDevice(device))}>
                    Изменить
                </Button>
                <Button className={cls.button} type="primary" onClick={() => setVisible(true)}>
                    Программное обеспечение
                </Button>
            </div>
            {visible && (
                <DeviceFrimwareModal deviceId={device.id} firmwares={device.firmwares} setVisible={setVisible} />
            )}
            {showUpdateDevice && <HomeModalDeviceUpdate />}
        </div>
    );
};
