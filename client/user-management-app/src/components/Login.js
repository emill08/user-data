import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message, Card } from 'antd';
import { useHistory } from 'react-router-dom';

const baseUrl = 'https://reqres.in';

const Login = ({ onLoginSuccess }) => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(`${baseUrl}/api/login`, values);
            message.success('Login successful!');
            onLoginSuccess(response.data);
            history.push('/users');
        } catch (error) {
            message.error(error.response?.data.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-sm p-6 shadow-md">
                <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
                <Form onFinish={handleSubmit}>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Email" className="mb-4" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" className="mb-4" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
