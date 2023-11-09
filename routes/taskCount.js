const express = require('express');
const testUser = require('../middleware/testUser');
const router = express.Router();
const { getTaskCount, getAllTaskCounts } = require('../controllers/taskCount');

router.route('/').get(getAllTaskCounts);
router.route('/taskCount').post(getTaskCount);

module.exports = router;
