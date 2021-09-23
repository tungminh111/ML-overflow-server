const { createModule, gql } = require("graphql-modules");
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

                changePassword(
                    oldPassword: String
                    newPassword: String
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
            changePassword: controller.user.changePassword,
        },
    },
});

module.exports = {
    userModule,
};
