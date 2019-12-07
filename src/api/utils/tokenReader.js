const jwt = require('jsonwebtoken');

const secretKey = require('./../utils/defaultSecretKey');

exports.get = (req) => {
    if (!req.header('access-token')) return '';
    jwt.verify(req.header('access-token'), secretKey.secret, (err, decoded) => {
        if (err)
            return '';
        if (decoded.role !== 'SWA')
            return decoded.id;
        return req.body.userid;
    }).catch(error => {
        // catching error
        return '';
    });
}