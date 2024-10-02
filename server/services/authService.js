const axios = require('axios');

class AuthService {
    async register(email, password) {
        try {
            console.log('Attempting to register with:', { email, password });
            const response = await axios.post('https://reqres.in/api/register', {
                email: email,
                password: password
            });
            console.log('Registration successful:', response.data);
            return response.data;
        } catch (error) {
            console.error('Registration Error:', error.response ? error.response.data : error.message);
            throw new Error(error.response ? error.response.data.error : 'Registration failed');
        }
    }

    async login(email, password) {
        console.log('Attempting to login with:', { email, password });
        try {
            const response = await axios.post('https://reqres.in/api/login', {
                email: email,
                password: password
            });

            if (!response.data.token) {
                console.error('No token returned, invalid credentials');
                throw new Error('Invalid credentials');
            }

            console.log('Login successful, token received:', response.data.token);
            return response.data;
        } catch (error) {
            console.error('Login Error:', error.response ? error.response.data : error.message);
            throw new Error(error.response ? error.response.data.error : 'Login failed');
        }
    }
}

module.exports = new AuthService();
