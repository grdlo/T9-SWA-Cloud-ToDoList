const HTTPError = require('http-errors');

const tokenReader = require('./../utils/tokenReader');
const Task = require('./../models/taskSchema');

/**
 *  GET all Tasks in db
 * 
 * @param {*} req in comming request
 * @param {*} res request response
 * @param {*} next next middleware
 */
exports.getTask = (req, res, next) => {
    // Looking for all task of the database
    Task.find()
        .select("-password -token -__v")
        .then(tasks => {
            res.status(200).json({ tasks: tasks });
        }).catch(error => {
            // catching error
            return next(error);
        });
};

/**
 *  GET all Tasks of a user in db
 * 
 * @param {*} req in comming request
 * @param {*} res request response
 * @param {*} next next middleware
 */
exports.getUserTask = (req, res, next) => {
    Task.find({ author: req.params.userId })
        .then(tasks => {
            res.status(200).json({ tasks: tasks })
        }).catch(error => {
            // catching error
            return next(error);
        });
}

/**
 * GET Task in db
 * 
 * @param {*} req in comming request
 * @param {*} res request response
 * @param {*} next next middleware
 */
exports.getOneTask = (req, res, next) => {

    Task.findOne({
        $or: [
            { _id: req.params.taskId }
        ]
    }).select("-password -token -__v").then(doc => {
        if (!doc) throw HTTPError.NotFound("Task does not exist");
        res.status(200).json({ task: doc });

    }).catch(error => {
        // catching error
        return next(error);
    });
}

/**
 * PUT Task in db
 * 
 * @param {*} req in comming request
 * @param {*} res request response
 * @param {*} next next middleware
 */
exports.newTask = (req, res, next) => {
    // Create new task
    const author = tokenReader.get(req);
    const task = new Task({
        author: author,
        title: req.body.title
    });
    // Saving the new task
    task.save()
        .then(result => {
            result.__v = undefined;
            res.status(201).json({ task: result });
        }).catch(error => {
            // catching error
            return next(error);
        });
}


/**
 * PATCH Task in db
 * 
 * @param {*} req in comming request
 * @param {*} res request response
 * @param {*} next next middleware
 */
exports.updateTask = (req, res, next) => {
    // Looking for the Task in db
    Task.findOne({
        _id: req.params.taskId
    }).then(doc => {
        if (!doc) throw HTTPError.NotFound("Task does not exist");
        const keys = Object.keys(req.body.task);
        // passing throw each key and updating them
        doc.done = req.body.task.done;
        // Saving the doc
        return doc.save();
    }).then(result => {
        res.status(200).json({ log: result });
    }).catch(error => {
        // catching error
        return next(error);
    });
}

/**
 * DELETE Task in db
 * 
 * @param {*} req in comming request
 * @param {*} res request response
 * @param {*} next next middleware
 */
exports.removeTask = (req, res, next) => {
    // Looking for the Task in db and remove it
    Task.deleteOne({
        _id: req.params.taskId
    }).then(result => {
        res.status(200).json({ log: result });
    }).catch(error => {
        // catching error
        return next(error);
    });
};