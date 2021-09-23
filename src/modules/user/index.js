const { createModule, gql } = require("graphql-modules");
const service = require("../../services");
const CryptoJS = require("crypto-js");
const config = require("../../config");
const { Op } = require("sequelize");
const { redisClient } = require("../../config/redis");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-errors");
const Helpers = require("../../helpers");
const controller = require("../../controller");

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
                users: [User]
            }

            extend type Mutation {
                updateInformationUser(
                    userId: String!
                    name: String
                    avatar: String
                ): Response
            }
        `,
    ],
    resolvers: {
        Query: {
            users: controller.user.getUsers,
        },
        Mutation: {
            updateInformationUser: controller.user.updateInformationUser,
        },
    },
});

module.exports = {
    userModule,
};
