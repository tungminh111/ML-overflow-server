const { createApplication } = require("graphql-modules");
const modules = require("../../modules");

// This is your application, it contains your GraphQL schema and the implementation of it.
const application = createApplication({
    modules: [modules.userModule],
});

const schema = application.createSchemaForApollo();

module.exports = {
    schema,
};
