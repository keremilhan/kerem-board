require('dotenv').config();
require('express-async-errors');
const cors = require('cors');
const express = require('express');
const path = require('path');
// extra security packages
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const app = express();

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

const authRouter = require('./routes/auth');
const tasksRouter = require('./routes/tasks');
const taskCountRouter = require('./routes/taskCount');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

app.set('trust proxy', 1);

app.use(cors(['https://kerem-board-app.onrender.com']));
app.use(express.static(path.resolve(__dirname, '/client/build')));
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(limiter);

// delay middleware for development
const delayMiddleware = require('./middleware/delay');

//routes
// You can add delay middleware for development purposes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', authenticateUser, tasksRouter);
app.use('/api/v1/taskCount', authenticateUser, taskCountRouter);

// for other routes, serve index.html from the client(react application)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
