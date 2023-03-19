import { Form, Input, Modal, Select } from 'antd';

import { DeviceCreate, DeviceType } from '../../../../services/devices/devices';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import { createMyDevicesAsync } from '../../../../store/slices/devices';

const { Option } = Select;

export const HomeModalDeviceCreate = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    const { createDevice, loadingCreate } = useAppSelector(reducers => reducers.devices);
    const onFinish = (values: DeviceCreate) => dispatch(createMyDevicesAsync(values));

    return (
        <Modal
            title="Создание устройства"
            onOk={() => form.submit()}
            onCancel={() => dispatch(createMyDevicesAsync(null))}
            confirmLoading={loadingCreate}
            okText="Добавить"
            cancelText="Отмена"
            visible
        >
            {createDevice && (
                <Form
                    form={form}
                    name="device"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{
                        name: createDevice.name,
                        wifi_name: createDevice.wifi_name,
                        wifi_password: createDevice.wifi_password,
                        type: createDevice.type,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Название девайса"
                        name="name"
                        rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Название WiFi сети"
                        name="wifi_name"
                        rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Пароль WiFi сети"
                        name="wifi_password"
                        rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Тип устройства"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, выберите тип устройства!',
                            },
                        ]}
                    >
                        <Select>
                            <Option value={DeviceType.LED}>Управление светодиодом</Option>
                        </Select>
                    </Form.Item>
                </Form>
            )}
        </Modal>
    );
};
