const jwt = require('jsonwebtoken');
const  JWT_SECRET  = "todo_app_validate"

const validateToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).send({
            success: false,
            message: 'Please provide token in authorization header'
        });
    }

    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7, authHeader.length);
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Invalid Token'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(400).send({
            success: false,
            message: 'Bearer is missing from the auth header'
        });
    }
};

module.exports = {
    validateToken
}
