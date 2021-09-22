const { createModule, gql } = require("graphql-modules");
const service = require("../../services");
const CryptoJS = require("crypto-js");
const config = require("../../config");
const { Op } = require("sequelize");
const { redisClient } = require("../../config/redis");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-errors");
const Helpers = require("../../helpers");

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
    },
});

module.exports = {
    userModule,
};
