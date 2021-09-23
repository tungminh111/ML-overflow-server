const { createModule, gql } = require("graphql-modules");
const service = require("../../services");
const CryptoJS = require("crypto-js");
const config = require("../../config");
const { Op } = require("sequelize");
const { redisClient } = require("../../config/redis");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-errors");
const Helpers = require("../../helpers");

const authenticationModule = createModule({
    id: "authentication",
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Mutation {
                createUser(
                    username: String!
                    password: String!
                    avatar: String
                    email: String
                    name: String
                ): Response

                login(username: String!, password: String!): Response

                verifyRefreshToken(refreshToken: String!): Response

                generateAccessToken(refreshToken: String!): Response

                logout(refreshToken: String!): Response
            }
        `,
    ],
    resolvers: {
        Mutation: {
            createUser: async (parent, args, context, info) => {
                const encryptedPassword = CryptoJS.HmacSHA256(
                    args.password,
                    config.PRIVATE_KEY
                );
                args.password = encryptedPassword.toString();
                console.log(args);
                await service.User.create(args);
                return {
                    success: true,
                };
            },
            login: async (parent, args, context, info) => {
                const user = await service.User.findOne({
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
                const isSuccess = trueEncryptedPassword === encryptedPassword;
                let accessToken = null;
                if (isSuccess) {
                    // Generate token
                    accessToken = Helpers.generateAccessToken(
                        userDataValue.id,
                        userDataValue.username
                    );
                    refreshToken = jwt.sign(
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
                }

                return {
                    data: isSuccess
                        ? JSON.stringify({
                              accessToken: accessToken,
                              refreshToken: refreshToken,
                          })
                        : null,
                    success: isSuccess,
                };
            },
            logout: async (parent, args, context, info) => {
                const {
                    isAuthenticated,
                    userId,
                    authenticatedErrorMsg,
                    accessToken,
                } = context;
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
            },
            verifyRefreshToken: async (parent, args, context, info) => {
                try {
                    const decoded = jwt.verify(
                        args.refreshToken,
                        config.JWT_REFRESH_SECRET
                    );

                    if (!decoded) throw new Error("Token invalid");

                    // check refresh token if it is stored in redis
                    const storedUserToken = await redisClient.get(
                        args.refreshToken
                    );
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
            },
            generateAccessToken: async (parent, args, context, info) => {
                try {
                    const decoded = jwt.verify(
                        args.refreshToken,
                        config.JWT_REFRESH_SECRET
                    );

                    if (!decoded) throw new Error("Refresh token invalid");

                    // check refresh token if it is stored in redis
                    const storedUserToken = await redisClient.get(
                        args.refreshToken
                    );
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
            },
        },
    },
});

module.exports = {
    authenticationModule,
};
