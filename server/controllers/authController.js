const axios = require('axios');

class AuthController {
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const response = await axios.post('https://reqres.in/api/register', { email, password });
            res.status(201).json({
                success: true,
                data: response.data,
                message: 'User registered successfully',
            });
        } catch (error) {
            next(new Error(error.response ? error.response.data.error : error.message));
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const response = await axios.post('https://reqres.in/api/login', { email, password });
            res.status(200).json({
                success: true,
                data: response.data,
                message: 'User logged in successfully',
            });
        } catch (error) {
            next(new Error(error.response ? error.response.data.error : error.message));
        }
    }

    async listUsers(req, res, next) {
        try {
            const response = await axios.get('https://reqres.in/api/users');
            res.status(200).json({
                success: true,
                data: response.data,
                message: 'Users retrieved successfully',
            });
        } catch (error) {
            next(new Error('Failed to fetch users'));
        }
    }

    async getUserDetails(req, res, next) {
        const userId = req.params.id;
        try {
            const response = await axios.get(`https://reqres.in/api/users/${userId}`);
            res.status(200).json({
                success: true,
                data: response.data,
                message: 'User details retrieved successfully',
            });
        } catch (error) {
            next(new Error('User not found'));
        }
    }
}

module.exports = new AuthController();
