const { AuthenticationError } = require("apollo-server-errors");
const config = require("../../config");
const services = require("../../services");
const CryptoJS = require("crypto-js");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const Helpers = require("../../helpers");
const { redisClient } = require("../../config/redis");

const register = async (parent, args, context, info) => {
    const encryptedPassword = CryptoJS.HmacSHA256(
        args.password,
        config.PRIVATE_KEY
    );
    args.password = encryptedPassword.toString();
    await services.User.create(args);
    return {
        success: true,
    };
};

const login = async (parent, args, context, info) => {
    const user = await services.User.findOne({
        where: {
            username: {
                [Op.eq]: args.username,
            },
        },
    });
    if (!user) {
        return {
            message: "User not found",
            data: null,
            success: false,
        };
    }
    const userDataValue = user.toJSON();
    const trueEncryptedPassword = userDataValue.password;
    const encryptedPassword = CryptoJS.HmacSHA256(
        args.password,
        config.PRIVATE_KEY
    ).toString();
    if (trueEncryptedPassword === encryptedPassword) {
        // Generate token
        const accessToken = Helpers.generateAccessToken(
            userDataValue.id,
            userDataValue.username
        );
        const refreshToken = jwt.sign(
            {
                sub: userDataValue.id,
                username: userDataValue.username,
            },
            config.JWT_REFRESH_SECRET,
            {
                expiresIn: config.JWT_REFRESH_TIME,
            }
        );

        redisClient.set(refreshToken, userDataValue.id);
        return {
            message: "Success",
            data: JSON.stringify({
                accessToken: accessToken,
                refreshToken: refreshToken,
            }),
            success: true,
        };
    }

    return {
        message: "Wrong password",
        data: null,
        success: false,
    };
};

const logout = async (parent, args, context, info) => {
    const { isAuthenticated, userId, authenticatedErrorMsg, accessToken } =
        context;
    if (isAuthenticated && userId) {
        // delete token in redis
        await redisClient.del(args.refreshToken);

        // set current access token to black list and expire after config.JWT_ACCESS_TIME seconds
        await redisClient.set("BL_" + accessToken, userId, {
            EX: config.JWT_ACCESS_TIME,
        });
        return {
            data: null,
            message: "Logout success",
            success: true,
        };
    } else throw new AuthenticationError(authenticatedErrorMsg);
};

const verifyRefreshToken = async (parent, args, context, info) => {
    try {
        const decoded = jwt.verify(
            args.refreshToken,
            config.JWT_REFRESH_SECRET
        );

        if (!decoded) throw new Error("Token invalid");

        // check refresh token if it is stored in redis
        const storedUserToken = await redisClient.get(args.refreshToken);
        if (storedUserToken === decoded.sub)
            return {
                data: JSON.stringify(decoded),
                success: true,
            };
        else throw new Error("Token invalid");
    } catch (e) {
        return {
            data: null,
            message: e.toString(),
            success: false,
        };
    }
};

const generateAccessToken = async (parent, args, context, info) => {
    try {
        const decoded = jwt.verify(
            args.refreshToken,
            config.JWT_REFRESH_SECRET
        );

        if (!decoded) throw new Error("Refresh token invalid");

        // check refresh token if it is stored in redis
        const storedUserToken = await redisClient.get(args.refreshToken);
        if (storedUserToken === decoded.sub) {
            const accessToken = Helpers.generateAccessToken(
                decoded.sub,
                decoded.username
            );
            return {
                data: accessToken,
                success: true,
            };
        } else throw new Error("Refresh token invalid");
    } catch (e) {
        return {
            data: null,
            message: e.toString(),
            success: false,
        };
    }
};

module.exports = {
    register,
    login,
    logout,
    verifyRefreshToken,
    generateAccessToken,
};
