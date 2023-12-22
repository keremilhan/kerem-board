const TaskCount = require('../models/TaskCount');
const { StatusCodes } = require('http-status-codes');

// for specific dates
const getTaskCount = async (req, res) => {
    const {
        user: { userId },
        body: { date },
    } = req;
    const startDate = date[0];
    const endDate = date[1];

    try {
        let start, end;

        if (startDate === endDate) {
            const parts = startDate.split('-');
            start = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0));
            end = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 23, 59, 59, 999));
        } else {
            const parts1 = startDate.split('-');
            const parts2 = endDate.split('-');
            start = new Date(Date.UTC(parts1[0], parts1[1] - 1, parts1[2], 0, 0, 0, 0));
            end = new Date(Date.UTC(parts2[0], parts2[1] - 1, parts2[2], 23, 59, 59, 999));
        }

        const taskCountDocument = await TaskCount.findOne({ user: userId });

        if (taskCountDocument) {
            // Filter taskCounts within the specified date range
            const filteredTaskCounts = taskCountDocument.taskCounts.filter(entry => {
                return entry.date >= start && entry.date <= end;
            });

            res.status(StatusCodes.OK).json({ taskCount: filteredTaskCounts });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Task count document not found.' });
        }
    } catch (error) {
        console.error('Error while fetching task count:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

const getAllTaskCounts = async (req, res) => {
    const {
        user: { userId },
    } = req;

    try {
        const taskCountDocument = await TaskCount.findOne({ user: userId });
        if (taskCountDocument) {
            res.status(StatusCodes.OK).json({ taskCounts: taskCountDocument });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Task count document not found.' });
        }
    } catch (error) {
        console.error('Error while fetching task count:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};

module.exports = { getTaskCount, getAllTaskCounts };
