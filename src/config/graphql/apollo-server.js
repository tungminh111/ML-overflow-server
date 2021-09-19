const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const http = require("http");
const { schema } = require("./graphql-module");
const config = require("..");

async function startApolloServer(app) {
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise((resolve) =>
        httpServer.listen({ port: config.PORT }, resolve)
    );
    console.log(`🚀 Server ready at http://localhost:${config.PORT}`);
    console.log(
        `🚀 Graphql Server ready at http://localhost:${config.PORT}${server.graphqlPath}`
    );
}

module.exports = {
    startApolloServer,
};
