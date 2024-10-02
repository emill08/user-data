import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message, Card } from 'antd';
import { useHistory } from 'react-router-dom';

const baseUrl = 'https://reqres.in';
// const baseUrl = 'http://localhost:5000'

const Register = () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(`${baseUrl}/api/register`, values);
            message.success('Registration successful!');
            history.push('/login');
        } catch (error) {
            message.error(error.response?.data.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card 
                title="Register"
                style={{ width: '100%', maxWidth: 400 }}
                bordered={true}
                headStyle={{ textAlign: 'center' }}
            >
                <Form onFinish={handleSubmit}>
                    <Form.Item 
                        name="email" 
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item 
                        name="password" 
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Register;
