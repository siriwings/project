import User from './../models/user';
import jwt from 'jsonwebtoken';
import config from './../config';
/**
 *  The Auth Checker middleware function.
 */
export default (req, res, next) => {
    console.log("유저 허가 미들웨어");
    if (!req.headers.authorization) {
        console.log("에러: req.headers.authorization");
        return res.status(401).end();
    }

    // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[1];

    // decode the token using a secret key-phrase
    return jwt.verify(token, config.secret, (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) { return res.status(401).end(); }

        const userId = decoded.sub;

        // check if a user exists
        return User.findById(userId, (userErr, user) => {
            if (userErr || !user) {
                return res.status(401).end();
            }
            console.log('인증후 전해준 user : '+user);
            return next();
        });
    });
};


//module.exports = router;

//export default router;