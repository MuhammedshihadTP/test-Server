
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = function (req, res, next) {
   
    const token = req.header('Authorization');

    
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

  
    try {
        const decoded = jwt.verify(token, 'xyz'); 
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
