import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IDevice } from "../../services/devices/devices";
import { useAppSelector } from "../../store/hooks/hooks";
import { DeviceInfoGeneral } from "./device-info/DeviceInfoGeneral";
import { DeviceInfoPreview } from "./device-info/DeviceInfoPreview";
import { LedDeviceManagement } from "./device-management/LedDeviceManagement";
export const Device = () => {
  let { id } = useParams();
  const [device, setDevice] = useState<IDevice>();
  const { devices } = useAppSelector((reducers) => reducers.devicesReducer);

  useEffect(
    () => devices.forEach((dev) => dev.id === Number(id) && setDevice(dev)),
    [id, devices]
  );

  return device ? (
    <>
      <div className="device-page-info__container ">
        <DeviceInfoPreview device={device} />
        <DeviceInfoGeneral device={device} />
      </div>
      <div className="device-page-management__container ">
        <div className="device-page-management__wrapper">
          <LedDeviceManagement device={device} />
        </div>
      </div>
    </>
  ) : (
    <>Страница не найдена</>
  );
};
