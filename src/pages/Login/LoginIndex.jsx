import React from 'react';
import {
    Card,
    Form,
    Input,
    Button,
    message
} from 'antd';
import './Login.css';
import { LoginAPI } from '../../services/auth';
import { setToken } from '../../utils/tools';
import { useHistory } from 'react-router-dom';

function LoginIndex() {
    const {  push } = useHistory()
    const onFinish = async (values) => {
        console.log('Success:', values);
        const { code,data} = await LoginAPI(values);
        if (code === 1) {
            setToken(data);
            message.success('登录成功');
            push('/admin/charts');
        } else {
            message.error(data)
        }
    };
    return (
        <div className='box'>
            <Card title='后台管理系统' style={{width:'500px',height:'300px',margin:'150px auto'}}>
                <Form
                name="basic"
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                >
                <Form.Item
                    label="账号"
                    name="userName"
                    rules={[
                    {
                        required: true,
                        message: '请输入正确的账号!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: '请输入正确的密码!',
                    },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                    offset: 6,
                    span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default LoginIndex