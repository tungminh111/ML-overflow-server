const { createModule, gql } = require("graphql-modules");
const controller = require("../../controller");

const authenticationModule = createModule({
    id: "authentication",
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Mutation {
                register(
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
            register: controller.authentication.register,
            login: controller.authentication.login,
            logout: controller.authentication.logout,
            verifyRefreshToken: controller.authentication.verifyRefreshToken,
            generateAccessToken: controller.authentication.generateAccessToken,
        },
    },
});

module.exports = {
    authenticationModule,
};
