const { ApolloServer } = require("apollo-server-express");
const {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const http = require("http");
const { schema } = require("./graphql-module");
const config = require("..");
const jwt = require("jsonwebtoken");
const { redisClient } = require("../redis");

async function startApolloServer(app) {
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        schema,
        introspection: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        context: async ({ req }) => {
            const authorization = req.headers.authorization;
            const accessToken = authorization
                ? authorization.split(" ")[1]
                : null;
            try {
                if (!accessToken) throw new Error("Access token not found");
                const blackListAccessToken = await redisClient.get(
                    "BL_" + accessToken
                );
                if (blackListAccessToken)
                    throw new Error("Access token is expired");
                const decoded = jwt.verify(
                    accessToken,
                    config.JWT_ACCESS_SECRET
                );
                return {
                    isAuthenticated: true,
                    authenticatedErrorMsg: null,
                    userId: decoded.sub,
                    username: decoded.username,
                    accessToken,
                };
            } catch (e) {
                return {
                    isAuthenticated: false,
                    authenticatedErrorMsg: e.toString(),
                    userId: null,
                    username: null,
                    accessToken: null,
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
