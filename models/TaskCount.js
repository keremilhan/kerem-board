const mongoose = require('mongoose');

const TaskCountsArraySchema = new mongoose.Schema({
    date: { type: Date, required: true, unique: true },
    taskCount: { type: Number, default: 0 },
});

const TaskCountSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    taskCounts: [TaskCountsArraySchema],
});

module.exports = mongoose.model('TaskCount', TaskCountSchema);
