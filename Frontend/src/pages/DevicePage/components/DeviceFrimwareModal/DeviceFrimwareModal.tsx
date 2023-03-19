import { Button, Empty, Modal } from 'antd';

import { StatusLoadIcon } from '@components/StatusLoadIcon/StatusLoadIcon';
import { deviceFrimwareModalStyle as cls } from '@pages/DevicePage/components/DeviceFrimwareModal/DeviceFrimwareModal.const';
import { IFirmware } from '@services/firmware/firmware';
import { useAppDispatch, useAppSelector } from '@store/hooks/hooks';
import { createFirmwareAsync, deleteFirmwareAsync } from '@store/slices/devices';
import { formattedDateString } from '@utils/formattedDateString';

import './DeviceFrimwareModal.scss';

interface IDeviceFrimwareModal {
    deviceId: number;
    firmwares: Array<IFirmware>;
    setVisible: (visible: boolean) => void;
}
export const DeviceFrimwareModal = (props: IDeviceFrimwareModal) => {
    const dispatch = useAppDispatch();

    const { loadingFirmwareCreate } = useAppSelector(reducers => reducers.devices);
    const { firmwares, deviceId, setVisible } = props;

    return (
        <Modal
            onCancel={() => setVisible(false)}
            title="Управление прошивками"
            footer={null}
            cancelText=""
            okText=""
            open
        >
            <div className={cls.root}>
                <div className={cls.list}>
                    {firmwares.length !== 0 ? (
                        firmwares.map(el => (
                            <div key={el.id} className={cls.listItem}>
                                <StatusLoadIcon status={el.status} />
                                <i>{formattedDateString({ date: el.create_date, withTime: true })}</i>
                                <div className={cls.buttonsGroup}>
                                    <Button className={cls.button} href={el.programm} download>
                                        Скачать
                                    </Button>
                                    <Button
                                        className={cls.button}
                                        onClick={() => dispatch(deleteFirmwareAsync(el.id))}
                                        type="default"
                                        danger
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Empty description="ПО отсутствуют" />
                    )}
                </div>
                <Button
                    onClick={() => dispatch(createFirmwareAsync(deviceId))}
                    type="primary"
                    size="large"
                    disabled={loadingFirmwareCreate || firmwares.length >= 5}
                    block
                >
                    Сгенерировать ПО
                </Button>
            </div>
        </Modal>
    );
};
