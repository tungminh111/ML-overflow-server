const { createModule, gql } = require("graphql-modules");

const commonModule = createModule({
    id: "common",
    dirname: __dirname,
    typeDefs: [
        gql`
            type Response {
                data: String
                message: String
                success: Boolean
            }
        `,
    ],
    resolvers: {},
});

module.exports = {
    commonModule,
};
