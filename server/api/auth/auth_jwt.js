const jwt = require('jsonwebtoken');
const ck = require('ckey');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    // console.log(token);
    // const token = req.headers['x-access-token']
    // const token = req.body.token
    try {
        const decodedToken = jwt.verify(token, ck.JWT_KEY)
        const userId = decodedToken.userId;
        if (!userId) {
            return res.status(401).json({
                message: 'You are not authorized!'
            });
        }
        req.userId = userId;
    } catch (error) {
        return res.status(401).json({
            message: 'You are not authorized!'
        });
    }
    next();
}