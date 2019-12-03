const HTTPError = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = require('./../utils/defaultSecretKey');
const User = require('../models/userSchema');

/**
 * GET user in db
 * 
 * @param {*} req in comming request
 * @param {*} res request response
 * @param {*} next next middleware
 */
exports.login = (req, res, next) => {
    User.findOne(
        { email: req.body.email }
    ).select("-__v").then(doc => {
        if (!doc) throw HTTPError.NotFound("user does not exist");
        bcrypt.compare(req.body.password, doc.password).then(result => {
            if (!result)
                throw HTTPError.BadRequest("User or password incorrect");
            const token = jwt.sign({ id: doc._id, role: doc.role }, secretKey.secret);
            res.status(200).json({ token: token });
        }).catch(error => {
            // catching error
            return next(error);
        });
    }).catch(error => {
        // catching error
        return next(error);
    });
}

exports.verify = (req, res, next) => {
    if (!req.header('access-token')) throw HTTPError.Unauthorized('access denied');
    jwt.verify(req.header('access-token'), secretKey.secret, (err, decoded) => {
        if (err)
            return next(error);
        User.findOne(
            { _id: decoded.id }
        ).select("-__v").then(doc => {
            if (!doc) throw HTTPError.NotFound("user does not exist");
            if (doc.role === decoded.role) return next();
            throw HTTPError.Unauthorized('access denied');
        }).catch(error => {
            // catching error
            return next(error);
        });
    })
}

exports.verifyAdmin = (req, res, next) => {
    if (!req.header('access-token')) throw HTTPError.Unauthorized('access denied');
    jwt.verify(req.header('access-token'), secretKey.secret, (err, decoded) => {
        if (err)
            return next(error);
        if (decoded.role !== "SWA") throw HTTPError.Unauthorized('access denied');
        User.findOne(
            { _id: decoded.id }
        ).select("-__v").then(doc => {
            if (!doc) throw HTTPError.NotFound("user does not exist");
            if (doc.role === decoded.role && doc.role === "SWA") return next();
            throw HTTPError.Unauthorized('access denied');
        }).catch(error => {
            // catching error
            return next(error);
        });
    })
}

exports.verifyPersonnal = (req, res, next) => {
    if (!req.header('access-token')) throw HTTPError.Unauthorized('access denied');
    jwt.verify(req.header('access-token'), secretKey.secret, (err, decoded) => {
        if (err)
            return next(error);
        if (req.params.userId !== decoded.id && decoded.role !== "SWA") throw HTTPError.Unauthorized('access denied');
        User.findOne(
            { _id: decoded.id }
        ).select("-__v").then(doc => {
            if (!doc) throw HTTPError.NotFound("user does not exist");
            if (doc.role === decoded.role) return next();
            throw HTTPError.Unauthorized('access denied');
        }).catch(error => {
            // catching error
            return next(error);
        });
    })
}