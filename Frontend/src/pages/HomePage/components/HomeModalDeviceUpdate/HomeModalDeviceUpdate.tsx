import { Form, Input, Modal, Select } from 'antd';

import { DeviceCreate, DeviceType, IDevice } from '../../../../services/devices/devices';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import { updateMyDevicesAsync } from '../../../../store/slices/devices';

const { Option } = Select;

export const HomeModalDeviceUpdate = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    const { updateDevice, loadingUpdated } = useAppSelector(reducers => reducers.devices);
    const onFinish = (values: DeviceCreate) => {
        dispatch(updateMyDevicesAsync({ ...updateDevice, ...values } as IDevice));
    };

    return (
        <Modal
            title="Редактирование устройства"
            onOk={() => form.submit()}
            onCancel={() => dispatch(updateMyDevicesAsync(null))}
            confirmLoading={loadingUpdated}
            okText="Изменить"
            cancelText="Отмена"
            visible
        >
            {updateDevice && (
                <Form
                    form={form}
                    name="device"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{
                        name: updateDevice?.name,
                        wifi_name: updateDevice?.wifi_name,
                        wifi_password: updateDevice?.wifi_password,
                        type: updateDevice?.type,
                    }}
                    onFinish={onFinish}
                    autoComplete="new-password"
                >
                    <Form.Item
                        label="Название девайса"
                        name="name"
                        rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
                    >
                        <Input autoComplete="new-password" />
                    </Form.Item>
                    <Form.Item
                        label="Название WiFi сети"
                        name="wifi_name"
                        rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
                    >
                        <Input autoComplete="new-password" />
                    </Form.Item>
                    <Form.Item
                        label="Пароль WiFi сети"
                        name="wifi_password"
                        rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
                    >
                        <Input.Password autoComplete="new-password" />
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
