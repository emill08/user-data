const express = require('express');
const authController = require('./controllers/authController');
const errorMiddleware = require('./middlewares/errorMiddleware'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

app.get('/api/users', authController.listUsers);
app.get('/api/users/:id', authController.getUserDetails);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
