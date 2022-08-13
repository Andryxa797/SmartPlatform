import React from 'react'
import {Form, Input, Button} from 'antd';
import { useAppDispatch } from '../../store/hooks/hooks';
import { loginAsync } from '../../store/slices/auth';

export const Auth = () => {
    var dispatch = useAppDispatch()
    const onFinish = values => dispatch(loginAsync({username: values.username, password: values.password}))
    
    return <>
        <div style={{margin: "auto", width: '500px', marginTop: '200px'}}>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Логин"
                    name="username"
                    rules={[{required: true, message: 'Пожалуйста, введите логин!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{required: true, message: 'Пожалуйста, введите пароль!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </>
}