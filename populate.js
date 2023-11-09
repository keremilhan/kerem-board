require('dotenv').config();

const taskMockData = require('./task-mock-data.json');
const mockData = require('./mock-data.json');
const connectDB = require('./db/connect');
const Task = require('./models/Task');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);

        const deletedResult = await Task.deleteMany({ createdBy: '63cc329c57fff6b64d5d66ac' });

        console.log(`Deleted ${deletedResult.deletedCount} tasks with createdBy testUser.`);

        await Task.create(taskMockData);
        console.log('populated the new mock data successfully');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();
