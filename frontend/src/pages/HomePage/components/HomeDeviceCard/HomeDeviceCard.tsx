import { Link } from 'react-router-dom';

import { Button, Popconfirm } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { classnames } from '@bem-react/classnames';
import { homeDeviceCardStyle as cls } from '@pages/HomePage/components/HomeDeviceCard/HomeDeviceCard.const';
import { IHomeDeviceCardProps } from '@pages/HomePage/components/HomeDeviceCard/HomeDeviceCard.typing';
import { useAppDispatch, useAppSelector } from '@store/hooks/hooks';
import { deleteMyDevicesAsync, startCreateDevice, startUpdateDevice } from '@store/slices/devices';
import { RoutesPath } from '@utils/routes-path';

import processorPNG from './../../../../assert/image/electronic-icon/processor.png';
import './HomeDeviceCard.scss';

export const HomeDeviceCard = ({ device }: IHomeDeviceCardProps) => {
    const dispatch = useAppDispatch();

    const { loadingDelete } = useAppSelector(reducer => reducer.devices);

    if (!device) {
        return (
            <div className={classnames(cls.root, cls.сreateContainer)} onClick={() => dispatch(startCreateDevice())}>
                <PlusOutlined className={cls.icon} />
                <div className={cls.createTitle}>Добавить устройство!</div>
            </div>
        );
    }

    return (
        <div className={cls.root}>
            <Link className={cls.previewLink} to={RoutesPath.DeviceURL(device.id)}>
                <img src={processorPNG} alt="" className={cls.preview} />
            </Link>

            <Link className={cls.title} to={RoutesPath.DeviceURL(device.id)}>
                {device.name}
            </Link>

            <div className={cls.buttons}>
                <Button className={cls.buttonsItem} onClick={() => dispatch(startUpdateDevice(device))}>
                    Изменить
                </Button>
                <Popconfirm
                    title="Вы деиствительно хотите удалить устройство?"
                    onConfirm={() => dispatch(deleteMyDevicesAsync(device))}
                    okText="Да"
                    cancelText="Нет"
                >
                    <Button className={cls.buttonsItem} loading={loadingDelete}>
                        Удалить
                    </Button>
                </Popconfirm>
            </div>
        </div>
    );
};
