import { Select } from "antd";
import { DeviceType, IDevice } from "../../../services/devices/devices";
import { useAppDispatch } from "../../../store/hooks/hooks";
import { updateMyDevicesAsync } from "../../../store/slices/devices";
import processorPNG from "./../../../assert/image/electronic-icon/processor.png";

const { Option } = Select;

export interface IDeviceInfoPreview {
  device: IDevice;
}
export const DeviceInfoPreview = ({ device }: IDeviceInfoPreview) => {
  const dispatch = useAppDispatch();

  return (
    <div className="device-page-info-left-wrapper">
      <div className="device-page-info-left__preview-wrapper">
        <img
          src={processorPNG}
          alt=""
          className="device-page-info-left__preview"
        />
      </div>
      <div className="device-page-info-left__select-type-wrapper">
        <Select
          className="device-page-info-left__select-type"
          value={device.type}
          onChange={(type) =>
            dispatch(updateMyDevicesAsync({ ...device, type }))
          }
        >
          <Option value={DeviceType.LED}>Управление светодиодом</Option>
        </Select>
      </div>
    </div>
  );
};
