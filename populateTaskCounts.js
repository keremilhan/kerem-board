require('dotenv').config();

const connectDB = require('./db/connect');
const Task = require('./models/Task');
const TaskCount = require('./models/TaskCount');
const User = require('./models/User');

// Function to populate TaskCount documents
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await TaskCount.deleteMany({});

        const users = await User.find({});

        for (const user of users) {
            const userTasks = await Task.find({ createdBy: user._id });

            // Check if the user has tasks
            if (userTasks.length > 0) {
                // Calculate and create new TaskCount documents for the user
                const taskCounts = userTasks.reduce((countMap, task) => {
                    const taskDate = task.date.toISOString().split('T')[0]; // Extract the date in "YYYY-MM-DD" format
                    countMap[taskDate] = (countMap[taskDate] || 0) + 1;
                    return countMap;
                }, {});

                // Create a new TaskCount document for the user
                await TaskCount.create({ user: user._id, taskCounts });
            }
        }

        console.log('Populated proper taskCounts for each user.');

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();
