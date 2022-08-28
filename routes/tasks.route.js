const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  getTask,
  createNewTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

router.route('/').get(getAllTasks).post(createNewTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
