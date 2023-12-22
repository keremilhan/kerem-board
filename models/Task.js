const mongoose = require('mongoose');

const TaskCount = require('./TaskCount');

const SubTaskSchema = new mongoose.Schema({
    task: {
        type: String,
        maxLength: 100,
    },
    done: {
        type: Boolean,
        default: false,
    },
});

const TaskSchema = new mongoose.Schema(
    {
        taskName: {
            type: String,
            required: [true, 'Please provide task'],
            maxLength: 100,
        },
        subTasks: [SubTaskSchema],
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
        },
        status: {
            type: String,
            enum: ['open', 'in progress', 'done'],
            default: 'open',
        },
        date: {
            type: Date,
            required: [true, 'Please provide a date'],
        },
        estimatedTime: {
            type: String,
            required: [true, 'Please provide an estimated time'],
        },
        orderIndex: {
            type: Number,
        },
    },
    { timestamps: true }
);

// Middleware to increment task count
TaskSchema.post('save', async function () {
    if (!this.date || !this.createdBy) {
        console.log('Date or createdBy fields are missing. Cannot update task count.');
        return;
    }
    const date = this.date;
    const userId = this.createdBy;
    const uniqueDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
    try {
        // Find the TaskCount document for the user
        let taskCountDocument = await TaskCount.findOne({ user: userId });

        if (!taskCountDocument) {
            // If the TaskCount document doesn't exist, create it with an empty taskCounts array
            taskCountDocument = new TaskCount({ user: userId, taskCounts: { date, taskCount: 0 } });
        }

        // Find the taskCount object for the unique date, if it exists
        let taskCountObject = taskCountDocument.taskCounts.find(entry => entry.date.getTime() === uniqueDate.getTime());

        if (taskCountObject) {
            // If the taskCount object for the date exists, increment the taskCount
            taskCountObject.taskCount += 1;
        } else {
            // If the taskCount object doesn't exist for the date, create it with a default task count of 1
            taskCountObject = { date: uniqueDate, taskCount: 1 };
            taskCountDocument.taskCounts.push(taskCountObject);
        }

        // Save the TaskCount document
        await taskCountDocument.save();
        console.log(`Task count for ${uniqueDate} (User ${userId}): ${taskCountObject.taskCount}`);
    } catch (error) {
        console.error('Error updating task count:', error.message);
    }
});

module.exports = mongoose.model('Task', TaskSchema);
