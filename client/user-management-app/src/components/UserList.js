import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Card, Spin, message } from 'antd';
import { useHistory } from 'react-router-dom';
import '../UserList.css'; 

const baseUrl = 'https://reqres.in';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 6 });
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        const fetchUsers = async (page = 1) => {
            setLoading(true); // Start loading
            try {
                const response = await axios.get(`${baseUrl}/api/users`, {
                    params: { page }
                });
                setUsers(response.data.data);
                setPagination({
                    current: response.data.page,
                    pageSize: response.data.per_page,
                    total: response.data.total
                });
            } catch (error) {
                message.error("Failed to fetch users.");
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchUsers(pagination.current);
    }, [pagination.current]);

    const handleLogout = () => {
        localStorage.clear(); 
        history.push('/login');
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button 
                    type="primary" 
                    onClick={() => history.push(`/user/${record.id}`)}
                >
                    Details
                </Button>
            ),
        },
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-2xl p-4 shadow-md" style={{ width: '50%' }}>
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold">User List</h2>
                    <Button type="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
                {loading ? (
                    <div className="flex justify-center">
                        <Spin size="large" />
                    </div>
                ) : (
                    <Table 
                        dataSource={users} 
                        columns={columns} 
                        rowKey="id" 
                        pagination={{
                            current: pagination.current,
                            pageSize: pagination.pageSize,
                            total: pagination.total,
                            onChange: (page) => setPagination((prev) => ({ ...prev, current: page }))
                        }} 
                        scroll={{ x: 'max-content' }}
                    />
                )}
            </Card>
        </div>
    );
};

export default UserList;
