const { createModule, gql } = require("graphql-modules");
const service = require("../../services");
const CryptoJS = require("crypto-js");
const config = require("../../config");
const { Op } = require("sequelize");
const { redisClient } = require("../../config/redis");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-errors");

const userModule = createModule({
    id: "user",
    dirname: __dirname,
    typeDefs: [
        gql`
            type User {
                id: String
                name: String
                email: String
                username: String
                avatar: String
            }

            extend type Query {
                users: [User]!
            }

            type Mutation {
                createUser(
                    username: String!
                    password: String!
                    avatar: String
                    email: String
                    name: String
                ): Response

                login(username: String!, password: String!): Response

                verifyToken(token: String!): Response
            }
        `,
    ],
    resolvers: {
        Query: {
            users: (parent, args, context, info) => {
                const { isAuthenticated, userId, authenticatedErrorMsg } =
                    context;
                if (!isAuthenticated)
                    throw new AuthenticationError(authenticatedErrorMsg);
                return service.User.findAll();
            },
        },
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
                const userDataValue = user.toJSON();
                const trueEncryptedPassword = userDataValue.password;
                const encryptedPassword = CryptoJS.HmacSHA256(
                    args.password,
                    config.PRIVATE_KEY
                ).toString();
                const isSuccess = trueEncryptedPassword === encryptedPassword;
                let token = null;
                if (isSuccess) {
                    // Generate token
                    token = jwt.sign(
                        {
                            sub: userDataValue.id,
                            username: userDataValue.username,
                        },
                        config.JWT_SECRET,
                        {
                            expiresIn: config.JWT_ACCESS_TIME,
                        }
                    );

                    // Save to Redis
                    // redisClient.set(token, JSON.stringify(userDataValue));
                }

                return {
                    data: isSuccess
                        ? JSON.stringify({
                              token: token,
                          })
                        : null,
                    success: isSuccess,
                };
            },
            verifyToken: async (parent, args, context, info) => {
                try {
                    const decoded = jwt.verify(args.token, config.JWT_SECRET);

                    return {
                        data: JSON.stringify(decoded),
                        success: true,
                    };
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
    userModule,
};
