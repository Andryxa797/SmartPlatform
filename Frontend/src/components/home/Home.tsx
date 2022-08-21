import { PlusOutlined } from "@ant-design/icons";
import { Button, notification, Popconfirm } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { RoutesPath } from "../../helpers/routes-path";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import {
  deleteMyDevicesAsync,
  startCreateDevice,
  startUpdateDevice,
} from "../../store/slices/devices";
import processorPNG from "./../../assert/image/electronic-icon/processor.png";
import { HomeModalDeviceCreate } from "./modal/HomeModalDeviceCreate";
import { HomeModalDeviceUpdate } from "./modal/HomeModalDeviceUpdate";
export const Home = () => {
  const { devices, loadingDelete, errorFlag, showCreateDevice, showUpdateDevice } = useAppSelector(
    (reducer) => reducer.devicesReducer
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    errorFlag !== null && notification.error({ message: "Произошла ошибка!" });
  }, [errorFlag]);
  return (
    <>
      <div className="home">
        <div className="home-title">Доступные устройства</div>
      </div>
      <div className="home-devices-container">
        {devices.map((device) => (
          <div key={device.id} className="home-devices-card-wrapper">
            <div className="home-devices-card">
              <div className="home-devices-card__preview-container">
                <div className="home-devices-card__preview-wrapper">
                  <Link className="home-devices-card__title-link" to={RoutesPath.DeviceURL(device.id)}>
                    <img
                      src={processorPNG}
                      alt=""
                      className="home-devices-card__preview-img"
                    />
                    </Link>
                </div>
              </div>
              <div className="home-devices-card__title">
                <Link className="home-devices-card__title-link" to={RoutesPath.DeviceURL(device.id)}>{device.name}</Link>
                </div>
              <div className="home-devices-card__buttons-wrapper">
                <Button
                  className="home-devices-card__buttons-item"
                  onClick={() => dispatch(startUpdateDevice(device))}
                >
                  Изменить
                </Button>
                <Popconfirm
                  title="Вы деиствительно хотите удалить устройство?"
                  onConfirm={() => dispatch(deleteMyDevicesAsync(device))}
                  onCancel={() => {}}
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button
                    className="home-devices-card__buttons-item"
                    loading={loadingDelete}
                  >
                    Удалить
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </div>
        ))}
        <div className="home-devices-card-wrapper">
          <div
            className="home-devices-card__new-wrapper"
            onClick={() => dispatch(startCreateDevice())}
          >
            <div className="home-devices-card__new ">
              <PlusOutlined className="home-devices-card__new-icon" />
              <div className="home-devices-card__new-title">
                Добавить устройство!
              </div>
            </div>
          </div>
        </div>
      </div>
      {showUpdateDevice && <HomeModalDeviceUpdate />}
      {showCreateDevice && <HomeModalDeviceCreate />}
    </>
  );
};
