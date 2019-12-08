const express = require('express');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');

const Router = express.Router();

/**
 * GET /tasks/ (of every body)
 */
Router.get('/', authController.verifyAdmin, taskController.getTask);

/**
 * PUT /tasks/
 */
Router.put('/', taskController.newTask);

/**
 * PATCH /tasks/:taskId
 */
Router.patch('/:taskId', authController.verify, taskController.updateTask);

/**
 * DELETE /tasks/:taskId
 */
Router.delete('/:taskId', authController.verify, taskController.removeTask);

module.exports = Router;