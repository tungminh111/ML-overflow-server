const { createModule, gql } = require("graphql-modules");
const service = require("../../services");
const { AuthenticationError } = require("apollo-server-errors");

const followingModule = createModule({
    id: "following",
    dirname: __dirname,
    typeDefs: [
        gql`
            type Following {
                userId: String
                authorId: String
            }

            extend type Query {
                followings: [Following]
            }

            extend type Mutation {
                follow(authorId: String!): Response
            }
        `,
    ],
    resolvers: {
        Query: {
            followings: (parent, args, context, info) => {
                const { isAuthenticated, userId, authenticatedErrorMsg } =
                    context;
                if (!isAuthenticated)
                    throw new AuthenticationError(authenticatedErrorMsg);
                return service.Following.findAll();
            },
        },
        Mutation: {
            follow: async (parent, args, context, info) => {
                const { isAuthenticated, userId, authenticatedErrorMsg } =
                    context;
                if (!isAuthenticated)
                    throw new AuthenticationError(authenticatedErrorMsg);
                const { authorId } = args;

                await service.Following.create({
                    userId,
                    authorId,
                });

                return {
                    message: "Success",
                    success: true,
                };
            },
        },
    },
});

module.exports = {
    followingModule,
};
