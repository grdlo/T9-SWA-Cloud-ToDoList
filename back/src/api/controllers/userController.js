const HTTPError = require('http-errors');
const bcrypt = require('bcryptjs');

const User = require('../models/userSchema');

/**
 *  GET all users in db
 * 
 * @param {*} req in comming request
 * @param {*} res request response
 * @param {*} next next middleware
 */
exports.getUser = (req, res, next) => {

    User.find()
        .select("-password -token -__v")
        .then(users => {
            res.status(200).json({ users: users });

        }).catch(error => {
            // catching error
            return next(error);
        });
};

/**
 * GET user in db
 * 
 * @param {*} req in comming request
 * @param {*} res request response
 * @param {*} next next middleware
 */
exports.getOneUser = (req, res, next) => {

    User.findOne({
        $or: [
            { _id: req.params.userId }
        ]
    }).select("-password -token -__v").then(doc => {
        if (!doc) throw HTTPError.NotFound("user does not exist");
        res.status(200).json({ user: doc });

    }).catch(error => {
        // catching error
        return next(error);
    });
}

/**
 * PUT user in db
 * 
 * @param {*} req in comming request
 * @param {*} res request response
 * @param {*} next next middleware
 */
exports.newUser = (req, res, next) => {
    User.findOne({
        username: req.body.username 
    }).catch(error => {
            // catching error
            return next(error);
        }).then(doc => {
            if (doc) throw HTTPError.Conflict("username already in use");
            return bcrypt.hash(req.body.password, 12);

        }).then(hashedPassword => {
            const user = new User({
                username: req.body.username,
                password: hashedPassword
            });
            return user.save();

        }).then(result => {
            result.password = undefined;
            result.__v = undefined;
            res.status(201).json({ user: result });
        }).catch(error => {
            // catching error
            return next(error);
        });
}


/**
 * PATCH user in db
 * 
 * @param {*} req in comming request
 * @param {*} res request response
 * @param {*} next next middleware
 */
exports.updateUser = (req, res, next) => {

    if (req.body.password) {
        bcrypt.hash(req.body.password, 12).then(hashedPassword => {
            req.body.password = hashedPassword;
        }).catch(error => {
            // catching error
            return next(error);
        });
    }

    User.findOne({
        _id: req.params.userId
    }).then(doc => {
        if (!doc) throw HTTPError.NotFound("user does not exist");
        const keys = Object.keys(req.body);
        keys.forEach(key => {
            if (doc[key])
                doc[key] = req.body[key];
        });
        return doc.save();

    }).then(result => {
        res.status(200).json({ log: 'updated' });
    }).catch(error => {
        // catching error
        return next(error);
    });
}

/**
 * DELETE user in db
 * 
 * @param {*} req in comming request
 * @param {*} res request response
 * @param {*} next next middleware
 */
exports.removeUser = (req, res, next) => {

    User.deleteOne({
        _id: req.params.userId
    }).then(result => {
        console.log(result);
        res.status(200).json({ log: 'deleted' });
    }).catch(error => {
        // catching error
        return next(error);
    });
};