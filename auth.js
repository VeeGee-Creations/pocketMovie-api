const jwt = require('jsonwebtoken'),
    passport = require('passport');
const cors = require('cors');

require('./passport');

const jwtSecret = process.env.JWT_SECRET_KEY

const generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username,
        expiresIn: '7d',
        algorithm: 'HS256'
    });
};

/**
 * cors options
 * @constant
 * @type {object}
 * @default
 */
const corsOptions = {
    origin: process.env.CORS_WHITELIST,
    optionsSuccessStatus: 200,
    methods: 'GET, PUT, POST, DELETE, OPTIONS'
}

/**
 * login authentication
 * @module login/authentication
 * @param {*} router 
 */
module.exports = (router) => {

    /**
 * /login endpoint
 * method: post
 * authenticates user credentials
 * @param {express.request} req
 * @param {express.response} res
 */
    router.post('/login', cors(corsOptions), (req, res) => {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if(err || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user
                });
            }

            req.login(user, {session: false}, (err) => {
                if(err) res.send(err);

                const token = generateJWTToken(user.toJSON());
                return res.json({user, token});
            });
        })(req, res);
    });
};