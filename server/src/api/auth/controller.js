const logger = require('../../utils/Logger');
const prisma = require('../../utils/PrismaClient');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const mailer = require('../../utils/Mailer');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const user = await prisma.users.findUnique({
            where: {
                email: email.toLowerCase(),
            },
        });
        if (user) {
            logger.warn(`[/auth/register] - email already exists`);
            logger.debug(`[/auth/register] - email: ${email}`);
            return next({ path: '/auth/register', statusCode: 400, message: "Email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            await prisma.$transaction(async (_prisma) => {
                const newUser = await _prisma.users.create({
                    data: {
                        name,
                        email: email.toLowerCase(),
                        password: hashedPassword,
                        isPasswordSet: true
                    },
                });

                logger.info(`[/auth/register] - success - ${newUser.sys_id}`);
                logger.debug(`[/auth/register] - email: ${email}`);

                // send verification email with link
                const token = crypto.randomBytes(20).toString("hex");
                const verificationToken = await _prisma.verificationTokens.create({
                    data: {
                        userId: newUser.sys_id,
                        token,
                        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
                    },
                });
                const verificationLink = `${process.env.FRONTEND_URL}/verify/${verificationToken.token}`;
                await mailer.sendVerificationLink(newUser.email, verificationLink);

                delete newUser.password;
                delete newUser.sys_id;

                return res.status(200).json({
                    user: newUser,
                    message: "User created successfully",
                });
            }, { timeout: 10000 });
        } catch (transactionError) {
            return next({ path: '/auth/register', statusCode: 400, message: transactionError.message, extraData: transactionError });
        }
    } catch (err) {
        next({ path: '/auth/register', statusCode: 400, message: err.message, extraData: err });
    }
}

/**
 * 
 * @param {*} req 
 * @param {import('express').Response} res 
 * @param {*} next 
 * @returns 
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await prisma.users.findUnique({
            where: {
                email: email.toLowerCase(),
            },
        });
        if (!user) {
            logger.warn(`[/auth/login] - email not found`);
            logger.debug(`[/auth/login] - email: ${email}`);
            return res.status(400).json({
                message: "Email not found",
            });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            logger.warn(`[/auth/login] - invalid password`);
            logger.debug(`[/auth/login] - email: ${email}`);
            return next({ path: '/auth/login', status: 400, message: "Invalid password" })
        }
        const token = jwt.sign({ id: user.sys_id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        logger.info(`[/auth/login] - success - ${user.sys_id}`);
        logger.debug(`[/auth/login] - email: ${email}`);

        // Remove sensitive data from user object
        delete user.password;
        delete user.sys_id;

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        });

        return res.status(200).json({
            token,
            user,
        });
    } catch (err) {
        next({ path: '/auth/login', statusCode: 400, message: err.message, extraData: err });
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            logger.warn(`[/auth/getUser] - user not found`);
            logger.debug(`[/auth/getUser] - user: ${req.user.sys_id}`);
            return next({ path: '/auth/getUser', status: 400, message: "User not found" })
        }
        logger.info(`[/auth/getUser] - success - ${user.sys_id}`);
        logger.debug(`[/auth/getUser] - user: ${user.sys_id}`);
        delete user.password;
        delete user.sys_id;
        return res.status(200).json({
            user,
        });
    } catch (err) {
        next({ path: '/auth/getUser', status: 400, message: err.message, extraData: err });
    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({
            message: "Logged out successfully"
        });
    } catch (err) {
        next({ path: '/auth/logout', status: 400, message: err.message, extraData: err });
    }
}

module.exports = {
    register,
    login,
    getUser,
    logout,
}