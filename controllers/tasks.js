const Task = require('../models/Task');
const TaskCount = require('../models/TaskCount');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const getAllTasks = async (req, res) => {
    const {
        user: { userId },
        body: { date },
    } = req;
    console.log(date, 'date ne geldi getAll');
    const startDate = date[0];
    const endDate = date[1];
    if (startDate === endDate) {
        const parts = startDate.split('-');
        const start = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0));
        const end = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 23, 59, 59, 999));
        const tasks = await Task.find({ createdBy: userId, date: { $gte: start, $lt: end } });
        res.status(StatusCodes.OK).json({ tasks, totalTasks: tasks.length });
    } else {
        const parts1 = startDate.split('-');
        const parts2 = endDate.split('-');
        const start = new Date(Date.UTC(parts1[0], parts1[1] - 1, parts1[2], 0, 0, 0, 0));
        const end = new Date(Date.UTC(parts2[0], parts2[1] - 1, parts2[2], 23, 59, 59, 999));
        const tasks = await Task.find({ createdBy: userId, date: { $gte: start, $lt: end } });
        res.status(StatusCodes.OK).json({ tasks, totalTasks: tasks.length });
    }
};
const getTask = async (req, res) => {
    const {
        user: { userId },
        params: { id: taskId },
    } = req;
    const task = await Task.findOne({ _id: taskId, createdBy: userId });
    if (!task) {
        throw new NotFoundError(`No task with the ${taskId} id`);
    }
    res.status(StatusCodes.OK).json({ task });
};
const createTask = async (req, res) => {
    console.log(req.body.date, 'date create task');
    req.body.createdBy = req.user.userId;
    console.log(req.user);
    const task = await Task.create(req.body);
    res.status(StatusCodes.CREATED).json({ task });
};
const updateTask = async (req, res) => {
    const {
        body: { date },
        user: { userId },
        params: { id: taskId },
    } = req;
    console.log(req.body.taskName, 'updateTask, taskName');
    // if (!taskName && !status && !subTasks) {
    //     throw new BadRequestError('Task name field cannot be empty');
    // }

    if (date) {
        const oldTask = await Task.find({ createdBy: userId, _id: taskId });
        console.log(`oldTask`, oldTask);

        const oldTaskDate = oldTask[0].date;
        console.log(`oldTaskDate`, oldTaskDate);
        console.log(`oldTaskDate.getTime()`, oldTaskDate.getTime());

        const taskCountDocument = await TaskCount.findOne({ user: userId });

        if (taskCountDocument) {
            // Find the index of the task count object for the specified date in the taskCounts array
            const indexToRemove = taskCountDocument.taskCounts.findIndex(entry => {
                return entry.date.getTime() == oldTaskDate.getTime();
            });
            console.log(`indexToRemove`, indexToRemove);

            if (indexToRemove !== -1) {
                // Decrement the task count by 1
                taskCountDocument.taskCounts[indexToRemove].taskCount -= 1;

                // If the task count becomes less than or equal to 0, remove the document
                if (taskCountDocument.taskCounts[indexToRemove].taskCount <= 0) {
                    taskCountDocument.taskCounts.splice(indexToRemove, 1);
                }

                let taskCountObject = taskCountDocument.taskCounts.find(entry => {
                    return entry.date.getTime() === new Date(date).getTime();
                });
                console.log(`taskCountObject`, taskCountObject);

                if (taskCountObject) {
                    console.log(`taskCountObject var ife girdi`);

                    // If the taskCount object for the date exists, increment the taskCount
                    taskCountObject.taskCount += 1;
                } else {
                    console.log(`taskCountObject yok else girdi`);

                    // If the taskCount object doesn't exist for the date, create it with a default task count of 1
                    taskCountObject = { date: date, taskCount: 1 };
                    taskCountDocument.taskCounts.push(taskCountObject);
                }

                // Save the updated TaskCount document
                await taskCountDocument.save();

                console.log(`Task updated and TaskCount updated successfully`);
            } else {
                console.log(`Task updated and TaskCount can not be updated`);
            }
        }
    }
    const task = await Task.findByIdAndUpdate({ createdBy: userId, _id: taskId }, req.body, { new: true, runValidators: true });

    if (!task) {
        throw new NotFoundError(`No task with id ${taskId}`);
    }
    res.status(StatusCodes.OK).json({ task });
};

const updateOrderIndexes = async (req, res) => {
    try {
        console.log(req.body, 'req.body | update order indexes ');
        const { updatedTasks } = req.body; // Assuming tasks is an array of tasks with updated orderIndex values

        console.log(updatedTasks, 'update order indexes tasks');
        // Use a loop to update each task's orderIndex in the database
        for (const updatedTask of updatedTasks) {
            const { _id, orderIndex } = updatedTask;
            console.log(_id, 'update order indexes tasks _id');

            // Find the task by its _id and update its orderIndex
            await Task.findByIdAndUpdate(_id, { orderIndex });
        }

        return res.status(200).json({ message: 'Task orderIndexes updated successfully' });
    } catch (error) {
        console.error('Error updating task orderIndexes:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// const deleteTask = async (req, res) => {
//     const {
//         user: { userId },
//         params: { id: taskId },
//     } = req;
//     const task = await Task.findByIdAndRemove({ createdBy: userId, _id: taskId });
//     if (!task) {
//         throw new NotFoundError(`No task with id ${taskId}`);
//     }
//     res.status(StatusCodes.OK).send();

//     const taskCountDocument = await TaskCount.findOne({ user: taskToRemove.createdBy });

//     if (taskCountDocument) {
//         // Find the index of the task count object for the specified date in the taskCounts array
//         const indexToRemove = taskCountDocument.taskCounts.findIndex(entry => entry.date.getTime() === taskToRemove.date.getTime());

//         if (indexToRemove !== -1) {
//             // Decrement the task count by 1
//             taskCountDocument.taskCounts[indexToRemove].taskCount -= 1;

//             // If the task count becomes less than or equal to 0, remove the document
//             if (taskCountDocument.taskCounts[indexToRemove].taskCount <= 0) {
//                 taskCountDocument.taskCounts.splice(indexToRemove, 1);
//             }

//             // Save the updated TaskCount document
//             await taskCountDocument.save();

//             console.log(`Task count for ${taskToRemove.date} (User ${taskToRemove.createdBy}): ${taskCountDocument.taskCounts[indexToRemove].taskCount}`);
//         } else {
//             console.log(`Task count for ${taskToRemove.date} (User ${taskToRemove.createdBy}) not found.`);
//         }
//     } else {
//         console.log(`Task count document not found for User ${taskToRemove.createdBy}.`);
//     }
// };

const deleteTask = async (req, res) => {
    const {
        user: { userId },
        params: { id: taskId },
    } = req;
    const task = await Task.findByIdAndRemove({ createdBy: userId, _id: taskId });
    if (!task) {
        throw new NotFoundError(`No task with id ${taskId}`);
    }

    // Now, perform the operations related to task count
    const taskCountDocument = await TaskCount.findOne({ user: task.createdBy });

    if (taskCountDocument) {
        // Find the index of the task count object for the specified date in the taskCounts array
        const indexToRemove = taskCountDocument.taskCounts.findIndex(entry => entry.date.getTime() === task.date.getTime());

        if (indexToRemove !== -1) {
            // Decrement the task count by 1
            taskCountDocument.taskCounts[indexToRemove].taskCount -= 1;

            // If the task count becomes less than or equal to 0, remove the document
            if (taskCountDocument.taskCounts[indexToRemove].taskCount <= 0) {
                taskCountDocument.taskCounts.splice(indexToRemove, 1);
            }

            // Save the updated TaskCount document
            await taskCountDocument.save();

            console.log(`Task count for ${task.date} (User ${task.createdBy}): deleted`);
        } else {
            console.log(`Task count for ${task.date} (User ${task.createdBy}) not found.`);
        }
    } else {
        console.log(`Task count document not found for User ${task.createdBy}.`);
    }

    // Send the response to the client after performing the operations
    res.status(StatusCodes.OK).send();
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask, updateOrderIndexes };
