const Task = require('../models/Task');
const TaskCount = require('../models/TaskCount');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const getAllTasks = async (req, res) => {
    const {
        user: { userId },
        body: { date },
    } = req;
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
    req.body.createdBy = req.user.userId;
    const task = await Task.create(req.body);
    res.status(StatusCodes.CREATED).json({ task });
};
const updateTask = async (req, res) => {
    const {
        body: { date },
        user: { userId },
        params: { id: taskId },
    } = req;
    if (date) {
        const oldTask = await Task.find({ createdBy: userId, _id: taskId });
        const oldTaskDate = oldTask[0].date;
        const taskCountDocument = await TaskCount.findOne({ user: userId });
        if (taskCountDocument) {
            const indexToRemove = taskCountDocument.taskCounts.findIndex(entry => {
                return entry.date.getTime() == oldTaskDate.getTime();
            });
            if (indexToRemove !== -1) {
                taskCountDocument.taskCounts[indexToRemove].taskCount -= 1;
                if (taskCountDocument.taskCounts[indexToRemove].taskCount <= 0) {
                    taskCountDocument.taskCounts.splice(indexToRemove, 1);
                }
                let taskCountObject = taskCountDocument.taskCounts.find(entry => {
                    return entry.date.getTime() === new Date(date).getTime();
                });
                if (taskCountObject) {
                    taskCountObject.taskCount += 1;
                } else {
                    taskCountObject = { date: date, taskCount: 1 };
                    taskCountDocument.taskCounts.push(taskCountObject);
                }
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
        const { updatedTasks } = req.body; // Assuming tasks is an array of tasks with updated orderIndex values
        // Use a loop to update each task's orderIndex in the database
        for (const updatedTask of updatedTasks) {
            const { _id, orderIndex } = updatedTask;
            // Find the task by its _id and update its orderIndex
            await Task.findByIdAndUpdate(_id, { orderIndex });
        }
        return res.status(200).json({ message: 'Task orderIndexes updated successfully' });
    } catch (error) {
        console.error('Error updating task orderIndexes:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
const deleteTask = async (req, res) => {
    const {
        user: { userId },
        params: { id: taskId },
    } = req;
    const task = await Task.findByIdAndRemove({ createdBy: userId, _id: taskId });
    if (!task) {
        throw new NotFoundError(`No task with id ${taskId}`);
    }
    const taskCountDocument = await TaskCount.findOne({ user: task.createdBy });

    if (taskCountDocument) {
        const indexToRemove = taskCountDocument.taskCounts.findIndex(entry => entry.date.getTime() === task.date.getTime());
        if (indexToRemove !== -1) {
            taskCountDocument.taskCounts[indexToRemove].taskCount -= 1;
            if (taskCountDocument.taskCounts[indexToRemove].taskCount <= 0) {
                taskCountDocument.taskCounts.splice(indexToRemove, 1);
            }
            await taskCountDocument.save();
            console.log(`Task count for ${task.date} (User ${task.createdBy}): deleted`);
        } else {
            console.log(`Task count for ${task.date} (User ${task.createdBy}) not found.`);
        }
    } else {
        console.log(`Task count document not found for User ${task.createdBy}.`);
    }
    res.status(StatusCodes.OK).send();
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask, updateOrderIndexes };
