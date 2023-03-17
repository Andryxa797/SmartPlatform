import { useEffect } from 'react';

import { Button, Form, Input, Typography, notification } from 'antd';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { authPageStyle as cls } from '@pages/AuthPage/AuthPageLogin.const';

import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { loginAsync } from '../../store/slices/auth';
import { getMyDevicesAsync } from '../../store/slices/devices';
import './AuthPageLogin.scss';

const { Title } = Typography;

export const AuthPage = () => {
    const dispatch = useAppDispatch();
    const { state } = useAppSelector(reducer => reducer.auth);

    const onFinish = async values => {
        await dispatch(loginAsync({ username: values.username, password: values.password }));
        await dispatch(getMyDevicesAsync());
    };

    useEffect(() => {
        if (state === 'BadPassword') {
            notification.error({ message: 'Неправильный логин или пароль!' });
        }
        if (state === 'Error') {
            notification.error({ message: 'Произошла ошибка!' });
        }
    }, [state]);

    return (
        <>
            <div className={cls.root}>
                <div className={cls.container}>
                    <Form name="basic" onFinish={onFinish}>
                        <Title level={4} className={cls.title}>
                            Авторизация
                        </Title>
                        <Form.Item name="username" rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}>
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Пароль"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType="submit" className={cls.button}>
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
};
