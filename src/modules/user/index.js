const { createModule, gql } = require("graphql-modules");
const service = require("../../services");

const userModule = createModule({
    id: "user",
    dirname: __dirname,
    typeDefs: [
        gql`
            type User {
                id: String
                firstName: String
                lastName: String
                createdAt: String
                updatedAt: String
            }

            type Query {
                users: [User]!
            }

            type Mutation {
                createUser(firstName: String!, lastName: String): Boolean
            }
        `,
    ],
    resolvers: {
        Query: {
            users: () => service.User.findAll(),
        },
        Mutation: {
            createUser: async (parent, args, context, info) => {
                console.log(args)
                await service.User.create(args);
                return true;
            },
        },
    },
});

module.exports = {
    userModule,
};
