import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';

const baseUrl = 'https://reqres.in'
// const baseUrl = 'http://localhost:5000'

const Register = ({ onRegisterSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(`${baseUrl}/api/register`, values);
            message.success('Registration successful!');
            onRegisterSuccess(response.data);
        } catch (error) {
            message.error(error.response?.data.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Register;
