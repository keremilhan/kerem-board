require('dotenv').config();
const TaskCount = require('./models/TaskCount'); // Import your TaskCount model
const connectDB = require('./db/connect');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);

        // Find all TaskCounts for a specific user
        const userId = '63cc329c57fff6b64d5d66ac'; // Replace with the user ID you want to merge
        const userTaskCounts = await TaskCount.find({ user: userId });

        if (userTaskCounts.length === 0) {
            console.log('No TaskCounts found for the specified user.');
            process.exit(0);
        }

        // Create a merged TaskCount document
        const mergedTaskCount = {
            user: userId,
            taskCounts: {},
        };

        // Merge taskCounts for the same days
        for (const taskCount of userTaskCounts) {
            for (const [date, count] of Object.entries(taskCount.taskCounts)) {
                if (!mergedTaskCount.taskCounts[date]) {
                    mergedTaskCount.taskCounts[date] = count; // Initialize with count
                } else {
                    mergedTaskCount.taskCounts[date] += count; // Add count to existing date
                }
            }
        }

        // Create or update the merged TaskCount document
        const existingMergedTaskCount = await TaskCount.findOne({ user: userId });
        if (existingMergedTaskCount) {
            existingMergedTaskCount.taskCounts = mergedTaskCount.taskCounts;
            await existingMergedTaskCount.save();
            console.log('Merged TaskCounts updated successfully.');
        } else {
            const newMergedTaskCount = new TaskCount({
                user: userId,
                taskCounts: mergedTaskCount.taskCounts,
            });
            await newMergedTaskCount.save();
            console.log('Merged TaskCounts created successfully.');
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();
