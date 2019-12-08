const jwt = require('jsonwebtoken');

exports.get = (req) => {
    if (!req.header('access-token')) return "PLOP";
    let decoded = jwt.decode(req.header('access-token'), {json: true});
    console.log(req.header('access-token'));
    console.log(decoded);
    if (decoded && (decoded.role !== 'SWA' || !req.body.hasOwnProperty('userid') || req.body.userid === undefined))
        return decoded.id;
    return req.body.userid;
}