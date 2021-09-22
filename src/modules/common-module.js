const { createModule, gql } = require("graphql-modules");

const commonModule = createModule({
    id: "common",
    dirname: __dirname,
    typeDefs: [
        gql`
            type Query {
                helloWorld: String
            }

            type Response {
                data: String
                message: String
                success: Boolean
            }
        `,
    ],
    resolvers: {
        Query: {
            helloWorld: () => "Hello world!",
        },
    },
});

module.exports = {
    commonModule,
};
