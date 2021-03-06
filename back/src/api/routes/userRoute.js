const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const taskController = require('../controllers/taskController');

const Router = express.Router();

/**
 * GET /users/
 */
Router.get('/', authController.verifyAdmin, userController.getUser);

/**
 * GET /users/tasks/ (of user)
 */
Router.get('/:userId/tasks', authController.verifyPersonnal, taskController.getUserTask);

/**
 * PUT /users/
 */
Router.put('/', userController.newUser);

/**
 * GET /users/:userId
 */
Router.get('/:userId', authController.verifyPersonnal, userController.getOneUser);

/**
 * PATCH /users/:userId
 */
Router.patch('/:userId', authController.verifyPersonnal, userController.updateUser);

/**
 * DELETE /users/:userId
 */
Router.delete('/:userId', authController.verifyPersonnal, userController.removeUser);

module.exports = Router;