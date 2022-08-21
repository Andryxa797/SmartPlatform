import { Button, Input, message } from "antd";
import { useMemo } from "react";
import { IDevice } from "../../../services/devices/devices";
import { Typography } from "antd";
import { CopyOutlined } from "@ant-design/icons";
const { Title } = Typography;

export interface IDeviceInfoGeneral {
  device: IDevice;
}
export const DeviceInfoGeneral = ({ device }: IDeviceInfoGeneral) => {
  const formattedDateString = useMemo(() => {
    var date = new Date(device.create_date);
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  }, [device.create_date]);

  const handleClickCopy = (value: string) =>{
    navigator.clipboard.writeText(value)
    message.success('Успешно скопировано');
  }
  return (
    <div className="device-page-info-right-wrapper">
      <div className="device-page-info-right__title-wrapper">
        <div className="device-page-info-right__title">{device.name}</div>
        <div className="device-page-info-right__date">
          ({formattedDateString})
        </div>
      </div>
      <div className="device-page-info-right__row">
        <Title level={5}>Название Wi-Fi сети:</Title>
        <div>
          <Input.Group compact>
            <Input style={{ width: 'calc(100% - 100px)' }} value={device.wifi_name } />
            <Button icon={<CopyOutlined />} onClick={() => handleClickCopy(device.wifi_name)}/>
          </Input.Group>
        </div>
      </div>
      <div className="device-page-info-right__row">
        <Title level={5}>Пароль Wi-Fi сети:</Title>
        <div>
          <Input.Group compact>
            <Input.Password style={{ width: 'calc(100% - 100px)' }} value={device.wifi_password} />
            <Button icon={<CopyOutlined />} onClick={() => handleClickCopy(device.wifi_password)}/>
          </Input.Group>
        </div>
      </div>
      <div className="device-page-info-right__row">
        <Title level={5}>Публичный ключ:</Title>
        <div>
          <Input.Group compact>
            <Input.Password style={{ width: 'calc(100% - 100px)' }} value={device.uuid_public} />
            <Button icon={<CopyOutlined />} onClick={() => handleClickCopy(device.uuid_public)}/>
          </Input.Group>
        </div>
      </div>
      <div className="device-page-info-right__row">
        <Title level={5}>Приватный ключ:</Title>
        <div>
          <Input.Group compact>
            <Input.Password style={{ width: 'calc(100% - 100px)' }} value={device.uuid_private} />
            <Button icon={<CopyOutlined />} onClick={() => handleClickCopy(device.uuid_private)}/>
          </Input.Group>
        </div>
      </div>
    </div>
  );
};
