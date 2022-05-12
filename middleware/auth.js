const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, /*process.env.SECRET_KEY*/ 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.userId = { userId };
        if (req.body.userId && req.body.userId !== userId) {
            throw new Error('Invalid user ID');
        } else {
            next();
        }
    } catch (error) {
        res.status(403).json({ error: error | 'unauthorized request !' });
    }
};