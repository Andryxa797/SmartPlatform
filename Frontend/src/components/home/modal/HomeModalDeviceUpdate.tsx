import { Form, Input, Modal, Select } from "antd";
import { DeviceType } from "../../../services/devices/devices";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { endUpdateDevice } from "../../../store/slices/devices";

const { Option } = Select;

export const HomeModalDeviceUpdate = () => {
  const dispatch = useAppDispatch()
  const {updateDevice, showUpdateDevice} = useAppSelector((reducers)=>reducers.devicesReducer)

  const onFinish = (values: any) => {
    console.log(values);
  };
  
  return (
    <Modal
      title="Создание и редактирование устройства"
      visible={showUpdateDevice}
      onOk={()=>{}}
      onCancel={()=>{dispatch(endUpdateDevice(null))}}
    >
     <Form
      name="device"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={()=>{}}
      autoComplete="off"
    >
      <Form.Item
        label="Название девайса"
        name="name"
        rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
      >
        <Input defaultValue={updateDevice?.name}/>
      </Form.Item>
      <Form.Item
        label="Название WiFi сети"
        name="wifi_name"
        rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
      >
        <Input defaultValue={updateDevice?.wifi_name}/>
      </Form.Item>
      <Form.Item
        label="Пароль WiFi сети"
        name="wifi_password"
        rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
      >
        <Input.Password defaultValue={updateDevice?.wifi_password}/>
      </Form.Item>
      <Form.Item
        label="Тип устройства"
        name="type"
        rules={[{ required: true, message: 'Пожалуйста, выберите тип устройства!' }]}
      >
        <Select defaultValue={updateDevice?.type ?? DeviceType.LED}>
          <Option value={DeviceType.LED}>Управление светодиодом</Option>
        </Select>
      </Form.Item>

    </Form>

    </Modal>
  );
};
