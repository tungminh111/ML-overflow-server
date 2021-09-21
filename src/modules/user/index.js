const { createModule, gql } = require("graphql-modules");
const service = require("../../services");
const CryptoJS = require("crypto-js");
const config = require("../../config");
const { Op } = require("sequelize");
const { redisClient } = require("../../config/redis");

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

            type Query {
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

                validateToken(token: String!): Response
            }
        `,
    ],
    resolvers: {
        Query: {
            users: () => service.User.findAll(),
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
                    token = userDataValue.username + "'s token";
                    redisClient.set(token, JSON.stringify(userDataValue));
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
            validateToken: async (parent, args, context, info) => {
                const dataRedis = await redisClient.get(args.token);
                const isLoggedIn = dataRedis !== null;
                const dataResponse = {
                    isLoggedIn,
                    user: JSON.parse(dataRedis),
                };
                return {
                    data: JSON.stringify(dataResponse),
                    success: true,
                };
            },
        },
    },
});

module.exports = {
    userModule,
};
