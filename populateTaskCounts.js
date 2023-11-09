require('dotenv').config();

const connectDB = require('./db/connect');
const Task = require('./models/Task'); // Import your Task model
const TaskCount = require('./models/TaskCount'); // Import your TaskCount model
const User = require('./models/User');

// Function to populate TaskCount documents
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);

        // Step 1: Clear all existing TaskCounts
        await TaskCount.deleteMany({});

        // console.log('Cleared all existing TaskCounts.');

        // // Step 2: Delete tasks without a "date" property
        // const tasksToDelete = await Task.find({ date: { $exists: false } });

        // if (tasksToDelete.length > 0) {
        //     const taskIdsToDelete = tasksToDelete.map(task => task._id);
        //     await Task.deleteMany({ _id: { $in: taskIdsToDelete } });

        //     console.log(`Deleted ${tasksToDelete.length} tasks without a "date" property.`);
        // } else {
        //     console.log('No tasks found without a "date" property.');
        // }

        // // Step 3: Find tasks with hours and minutes details and update their date format
        // const allTasks = await Task.find();

        // const tasksToUpdate = allTasks.filter(task => {
        //     const dateString = task.date.toISOString();
        //     return dateString.includes('T') && dateString.endsWith('Z');
        // });

        // if (tasksToUpdate.length > 0) {
        //     for (const task of tasksToUpdate) {
        //         task.date = new Date(task.date.toISOString().split('T')[0] + 'T00:00:00Z');
        //         await task.save();
        //     }

        //     console.log(`Updated ${tasksToUpdate.length} tasks to the new date format.`);
        // } else {
        //     console.log('No tasks found with hours and minutes details.');
        // }

        // Step 4: Set estimatedTime to "1" for tasks without it
        // const tasksWithoutEstimatedTime = await Task.find({ estimatedTime: { $exists: false } });

        // if (tasksWithoutEstimatedTime.length > 0) {
        //     for (const task of tasksWithoutEstimatedTime) {
        //         task.estimatedTime = '1';
        //         await task.save();
        //     }

        //     console.log(`Set estimatedTime to "1" for ${tasksWithoutEstimatedTime.length} tasks.`);
        // } else {
        //     console.log('No tasks found without an estimatedTime property.');
        // }

        // Step 5: Recalculate and populate taskCounts
        const users = await User.find({}); // Assuming you have a User model

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
