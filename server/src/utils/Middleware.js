const jwt = require('jsonwebtoken');
const logger = require("./Logger");
const prisma = require('./PrismaClient');
const { merge } = require('lodash');
const ApiError = require('./ApiError');

const validateSchema = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    }
    catch (err) {
        next({ path: `${req.originalUrl}/middleware/validate`, status: 422, message: err.errors[0].message, extraData: err.errors })
    }
}

const errorMiddleware = (err, req, res, next) => {
    console.log(err)
    logger.error(`[/middleware/errorMiddleware] - `, err);
    let error = {
        message: err.message || 'Something went wrong',
    };
    if (err.extraData) {
        error = merge(error, { extraData: err.extraData });
    }
    if (!err.statusCode)
        err.statusCode = 400;
    // throw new ApiError(err.statusCode, err.message)
    res.status(err.statusCode).send(new ApiError(err.statusCode, err.message, error, err.stack));
}

const verifyJWT = async (req, res, next) => {
    const token = req.cookies?.token || req.header("Authorization")?.split(" ")[1];
    if (!token) {
        logger.warn(`[/middleware/verifyJWT] - token missing`);
        logger.debug(`[/middleware/verifyJWT] - token: ${token}`);
        return next({ path: "/middleware/verifyJWT", statusCode: 401, message: "No token provided" });
    }
    try {
        let payload;
        try {
            payload = await jwt.verify(token.toString(), process.env.JWT_SECRET);
        } catch (jwtError) {
            logger.warn(`[/middleware/verifyJWT] - invalid token`);
            logger.debug(`[/middleware/verifyJWT] - token: ${token}`);
            return next({ path: "/middleware/verifyJWT", statusCode: 401, message: "Invalid token" })
        }

        if (!payload.id) {
            logger.warn(`[/middleware/verifyJWT] - invalid token`);
            logger.debug(`[/middleware/verifyJWT] - token: ${token}`);
            return next({ path: "/middleware/verifyJWT", statusCode: 401, message: "Invalid token" })
        }
        const user = await prisma.users.findUnique({
            where: {
                sys_id: payload.id
            }
        });

        if (!user) {
            logger.warn(`[/middleware/verifyJWT] - user not found`);
            logger.debug(`[/middleware/verifyJWT] - user: ${payload.id}`);
            return next({ path: "/middleware/verifyJWT", statusCode: 401, message: "User not found" })
        }
        logger.info(`[/middleware/verifyJWT] - user: ${user.sys_id} authenticated`);
        req.user = user;
        next();
    } catch (error) {
        next({ path: "/middleware/verifyJWT", statusCode: 500, message: error.message, extraData: error })
    }
}

module.exports = {
    verifyJWT,
    validateSchema,
    errorMiddleware
}