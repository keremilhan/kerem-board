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

// // Middleware to increment task count
TaskSchema.post('save', async function () {
    if (!this.date || !this.createdBy) {
        console.log('Date or createdBy fields are missing. Cannot update task count.');
        return;
    }
    const date = this.date;
    console.log(date, 'date');

    const userId = this.createdBy;
    const uniqueDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));

    try {
        // Find the TaskCount document for the user
        let taskCountDocument = await TaskCount.findOne({ user: userId });

        if (!taskCountDocument) {
            // If the TaskCount document doesn't exist, create it with an empty taskCounts array
            taskCountDocument = new TaskCount({ user: userId, taskCounts: { date, taskCount: 0 } });
            console.log('userın ilk taskCount docmentı oluşturudu', taskCountDocument);
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
            console.log('If the taskCount object doesn"t exist for the date, create it with a default task count of 1', taskCountDocument);
        }

        // Save the TaskCount document
        console.log('taskCountDocument before saving', taskCountDocument);

        await taskCountDocument.save();

        console.log(`Task count for ${uniqueDate} (User ${userId}): ${taskCountObject.taskCount}`);
    } catch (error) {
        console.error('Error updating task count:', error.message);
    }
});

// TaskSchema.post('save', async function () {
//     if (!this.date || !this.createdBy) {
//         console.log('Date or createdBy fields are missing. Cannot update task count.');
//         return;
//     }

//     const date = this.date;
//     const userId = this.createdBy;
//     const uniqueDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));

//     try {
//         if (this.isModified('date')) {
//             // Document is being updated, and the 'date' field is being modified

//             const oldDate = this._original.date;

//             // Decrement the task count for the previous date (oldDate)
//             const oldTaskCountDocument = await TaskCount.findOne({ user: userId });

//             if (oldTaskCountDocument) {
//                 const indexToRemove = oldTaskCountDocument.taskCounts.findIndex(entry => entry.date.getTime() === oldDate.getTime());

//                 if (indexToRemove !== -1) {
//                     oldTaskCountDocument.taskCounts[indexToRemove].taskCount -= 1;

//                     if (oldTaskCountDocument.taskCounts[indexToRemove].taskCount <= 0) {
//                         oldTaskCountDocument.taskCounts.splice(indexToRemove, 1);
//                     }

//                     await oldTaskCountDocument.save();

//                     console.log(`Task count for ${oldDate} (User ${userId}): decremented`);
//                 }
//             }

//             // Increment the task count for the new updated date (uniqueDate)
//             const newTaskCountDocument = await TaskCount.findOne({ user: userId });

//             if (newTaskCountDocument) {
//                 const indexToUpdate = newTaskCountDocument.taskCounts.findIndex(entry => entry.date.getTime() === uniqueDate.getTime());

//                 if (indexToUpdate !== -1) {
//                     newTaskCountDocument.taskCounts[indexToUpdate].taskCount += 1;
//                 } else {
//                     newTaskCountObject = { date: uniqueDate, taskCount: 1 };
//                     newTaskCountDocument.taskCounts.push(newTaskCountObject);
//                 }

//                 await newTaskCountDocument.save();

//                 console.log(`Task count for ${uniqueDate} (User ${userId}): incremented`);
//             }
//         } else if (this.isNew) {
//             // Document is being created
//             // Handle creating logic as before
//         }
//     } catch (error) {
//         console.error('Error updating task count:', error.message);
//     }
// });

// TaskSchema.post('remove', async function () {
//     if (!this.date || !this.createdBy) {
//         console.log('Date or createdBy fields are missing. Cannot update task count.');
//         return;
//     }
//     console.log('remove task başlıyor');
//     const date = this.date;
//     const userId = this.createdBy;
//     const uniqueDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));

//     try {
//         // Find the TaskCount document for the specified user
//         let taskCountDocument = await TaskCount.findOne({ user: userId });

//         if (taskCountDocument) {
//             // Find the index of the task count object for the specified date in the taskCounts array
//             const indexToRemove = taskCountDocument.taskCounts.findIndex(entry => entry.date.getTime() === uniqueDate.getTime());

//             if (indexToRemove !== -1) {
//                 // Remove the task count object from the taskCounts array
//                 taskCountDocument.taskCounts.splice(indexToRemove, 1);

//                 // Save the updated TaskCount document
//                 await taskCountDocument.save();

//                 console.log(`Task count for ${uniqueDate} (User ${userId}) removed.`);
//             } else {
//                 console.log(`Task count for ${uniqueDate} (User ${userId}) not found.`);
//             }
//         } else {
//             console.log(`Task count document not found for User ${userId}.`);
//         }
//     } catch (error) {
//         console.error('Error updating task count:', error.message);
//     }
// });

module.exports = mongoose.model('Task', TaskSchema);
