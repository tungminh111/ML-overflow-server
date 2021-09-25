const { createModule, gql } = require("graphql-modules");
const service = require("../../services");
const { AuthenticationError } = require("apollo-server-errors");
const controller = require("../../controller");

const favoriteModule = createModule({
    id: "favorite",
    dirname: __dirname,
    typeDefs: [
        gql`
            type Favorite {
                userId: String!
                articleId: String!
            }

            extend type Query {
                favorites: [Favorite]
            }

            extend type Mutation {
                addFavorite(articleId: String!): Response
            }
        `,
    ],
    resolvers: {
        Query: {
            favorites: controller.favorite.getFavorites,
        },
        Mutation: {
            addFavorite: controller.favorite.addFavorite,
        },
    },
});

module.exports = {
    favoriteModule,
};
