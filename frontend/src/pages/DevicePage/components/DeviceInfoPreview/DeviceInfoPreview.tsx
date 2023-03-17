import { Select } from 'antd';

import { deviceInfoPreviewStyle as cls } from '@pages/DevicePage/components/DeviceInfoPreview/DeviceInfoPreview.const';

import { DeviceType, IDevice } from '../../../../services/devices/devices';
import { useAppDispatch } from '../../../../store/hooks/hooks';
import { updateMyDevicesAsync } from '../../../../store/slices/devices';
import processorPNG from './../../../../assert/image/electronic-icon/processor.png';
import './DeviceInfoPreview.scss';

const { Option } = Select;

export interface IDeviceInfoPreview {
    device: IDevice;
}
export const DeviceInfoPreview = ({ device }: IDeviceInfoPreview) => {
    const dispatch = useAppDispatch();

    return (
        <div className={cls.root}>
            <img src={processorPNG} alt="" className={cls.preview} />
            <div className={cls.selectContainer}>
                <Select
                    className={cls.select}
                    value={device.type}
                    onChange={type => dispatch(updateMyDevicesAsync({ ...device, type }))}
                >
                    <Option value={DeviceType.LED}>Управление светодиодом</Option>
                </Select>
            </div>
        </div>
    );
};
