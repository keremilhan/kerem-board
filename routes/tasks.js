const express = require('express');
const testUser = require('../middleware/testUser');
const router = express.Router();
const { getAllTasks, getTask, createTask, updateTask, deleteTask, updateOrderIndexes } = require('../controllers/tasks');

router.route('/').post(testUser, createTask);
router.route('/get').post(getAllTasks);
router.route('/order').patch(testUser, updateOrderIndexes);
router.route('/:id').get(testUser, getTask).patch(testUser, updateTask).delete(testUser, deleteTask);

module.exports = router;
