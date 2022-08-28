const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;

  const taskDocument = await Task.findOne({ _id: taskId });
  if (!taskDocument) {
    return next(createCustomError(`No task found with id: ${taskId}`, 404));
  }

  res.status(200).json({ task: taskDocument });
});

const createNewTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const { name: taskName, completed: taskStatus } = req.body;

  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId },
    {
      name: taskName,
      completed: taskStatus,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedTask) {
    return next(createCustomError(`No task found with id: ${taskId}`, 404));
  }
  res.status(200).json({ task: updatedTask });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;

  const deletedTask = await Task.findOneAndDelete({ _id: taskId });
  if (!deletedTask) {
    return next(createCustomError(`No task found with id: ${taskId}`, 404));
  }

  res.status(200).json({ task: deletedTask });
});

module.exports = {
  getAllTasks,
  getTask,
  createNewTask,
  updateTask,
  deleteTask,
};
