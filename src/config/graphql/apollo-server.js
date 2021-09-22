const { ApolloServer } = require("apollo-server-express");
const {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const http = require("http");
const { schema } = require("./graphql-module");
const config = require("..");
const jwt = require("jsonwebtoken");

async function startApolloServer(app) {
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        schema,
        introspection: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        context: ({ req }) => {
            const authorization = req.headers.authorization;
            try {
                const decoded = jwt.verify(
                    authorization ? authorization.split(" ")[1] : null,
                    config.JWT_SECRET
                );
                return {
                    isAuthenticated: true,
                    authenticatedErrorMsg: null,
                    userId: decoded.sub,
                    username: decoded.username,
                };
            } catch (e) {
                return {
                    isAuthenticated: false,
                    authenticatedErrorMsg: e.toString(),
                    userId: null,
                    username: null,
                };
            }
        },
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
