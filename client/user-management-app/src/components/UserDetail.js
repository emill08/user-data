import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spin, message, Row, Col, Button } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const baseUrl = 'https://reqres.in';

const UserDetail = () => {
    const { id } = useParams();
    const history = useHistory(); // Hook for navigation
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/users/${id}`);
                setUser(response.data.data);
            } catch (error) {
                message.error('Failed to fetch user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (loading) return <Spin />;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card 
                title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button 
                            type="link" 
                            icon={<ArrowLeftOutlined />} 
                            onClick={() => history.push('/users')} 
                            style={{ marginRight: '8px' }}
                        />
                        User ID: {user.id}
                    </div>
                } 
                style={{ width: 400 }} 
                bordered={false}
                headStyle={{ backgroundColor: '#f0f2f5' }}
                bodyStyle={{ textAlign: 'left' }}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <div style={{ marginBottom: '16px' }}>
                            <strong>Email:</strong> {user.email}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <strong>First Name:</strong> {user.first_name}
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <strong>Last Name:</strong> {user.last_name}
                        </div>
                    </Col>
                    <Col span={24}>
                        <img 
                            src={user.avatar} 
                            alt="Avatar" 
                            style={{ width: '100%', borderRadius: '8px', marginTop: '16px' }} 
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default UserDetail;
