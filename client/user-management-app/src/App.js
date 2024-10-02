import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import Register from './components/Register';
import Login from './components/Login';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';

const App = () => {
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        localStorage.setItem('token', userData.token);
    };

    const handleRegisterSuccess = (userData) => {
        setUser(userData);
        localStorage.setItem('token', userData.token); 
    };

    return (
        <Router>
            <div className="container mx-auto p-4">
                <Switch>
                    <Route path="/register" component={() => <Register onRegisterSuccess={handleRegisterSuccess} />} />
                    <Route path="/login" component={() => <Login onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/users" component={UserList} />
                    <Route path="/user/:id" component={UserDetail} />
                    <Redirect from="/" to="/login" />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
