import { Form, Input, Button, Typography, notification } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { loginAsync } from '../../store/slices/auth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { getMyDevicesAsync } from '../../store/slices/devices';

const { Title } = Typography;

export const Auth = () => {
    var dispatch = useAppDispatch()
    const { state } = useAppSelector((reducer) => reducer.authReducer)
    const onFinish = async values => {
        await dispatch(loginAsync({ username: values.username, password: values.password }))
        await dispatch(getMyDevicesAsync())
    }
    useEffect(() => {
        if (state === "BadPassword") notification.error({ message: "Неправильный логин или пароль!" })
        if (state === "Error") notification.error({ message: "Произошла ошибка!" })
    }, [state])
    return <>
        <div className='login-wrapper' />
        <div className='login-container'>
            <Form
                name="basic"
                onFinish={onFinish}
                className="login-form"
            >
                <Title level={4} className="login-form__title">Авторизация</Title>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Пароль"
                    />
                </Form.Item>

                <Form.Item >
                    <Button htmlType="submit" className="login-form__button">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </>
}