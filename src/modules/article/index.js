
const { createModule, gql } = require("graphql-modules");
const controller = require("../../controller");
const config = require("../../config");
const { Op } = require("sequelize");
const { Query } = require("pg");

const articleModule = createModule({
    id: "article",
    dirname: __dirname,
    typeDefs: [
        gql`
            type Article {
                title: String
                content: String
                createDate: String
                authorId: String
                slug: String
                thumbnailImage: String 
            }
            extend type Query {
                listArticles(
                    articleQuantity: Int
                ): [Article]!
            }
            extend type Mutation{
                createArticle(
                    title: String!
                    content: String!
                    createDate: String!
                    authorUsername: String
                    thumbnailImage: String
                ): Response
            }
        `,
    ],
    resolvers: {
        Article: {
            createDate(obj, args, context, info) {
                return JSON.stringify(obj.createDate)
            }
        },
        Query: {
            listArticles(obj, args, context, info) {
                return controller.article.getListArticles(args.articleQuantity);
            }
        },
        Mutation: {
            createArticle(obj, args, context, info) {
                let data = {
                    title: args.title,
                    content: args.content,
                    createDate: Date.parse(args.createDate),
                    authorUsername: args.authorUsername, // fixme: authentication
                    thumbnailImage: args.thumbnailImage 
                }
                controller.article.createArticle(data);
            }
        }
    }
});

module.exports = {
    articleModule
};