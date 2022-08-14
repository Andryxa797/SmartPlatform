import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { startUpdateDevice } from "../../store/slices/devices";
import processorPNG from "./../../assert/image/electronic-icon/processor.png";
import { HomeModalDeviceUpdate } from "./modal/HomeModalDeviceUpdate";
export const Home = () => {
  const { devices } = useAppSelector((reducer) => reducer.devicesReducer);
  const dispatch = useAppDispatch()
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
                  <img
                    src={processorPNG}
                    alt=""
                    className="home-devices-card__preview-img"
                  />
                </div>
              </div>
              <div className="home-devices-card__title">
                {device.name}
              </div>
              <div className="home-devices-card__buttons-wrapper">
                <Button className="home-devices-card__buttons-item" onClick={()=>dispatch(startUpdateDevice(device))}>
                  Изменить
                </Button>
                <Popconfirm
                  title="Вы деиствительно хотите удалить устройство?"
                  onConfirm={() => {}}
                  onCancel={() => {}}
                  okText="Да"
                  cancelText="Нет"
                >
                  <Button className="home-devices-card__buttons-item">
                    Удалить
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </div>
        ))}

        <div className="home-devices-card-wrapper">
          <div className="home-devices-card__new-wrapper">
            <div className="home-devices-card__new ">
              <PlusOutlined className="home-devices-card__new-icon" />
              <div className="home-devices-card__new-title">
                Добавить устройство!
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeModalDeviceUpdate />
    </>
  );
};
