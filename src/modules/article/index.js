
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
                title: String!
                content: String!
                authorId: String!
                createDate: String!
                slug: String!
                thumbnailImage: String!
            }
            extend type Query {
                listArticles(
                    sentQuantity: Int
                    articleQuantity: Int
                ): [Article]!
                getArticle(
                    articleSlug: String
                ): Article
            }
            extend type Mutation{
                createArticle(
                    title: String!
                    content: String!
                    authorUsername: String!
                    thumbnailImage: String!
                ): Response
                deleteArticle(
                    articleSlug: String!
                ): Response
                updateArticle(
                    articleSlug: String!
                    content: String!
                    title: String!
                    thumbnailImage: String!
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
            listArticles: async function(obj, args, context, info) {
                return await controller.article.getListArticles(args.sentQuantity, args.articleQuantity);
            },
            getArticle: async function (obj, args, context, info) {
                return controller.article.getArticleBySlug(args.articleSlug)
            }
        },
        Mutation: {
            createArticle: async function(obj, args, context, info) {
                let data = {
                    title: args.title,
                    content: args.content,
                    createDate: Date.now(),
                    authorUsername: args.authorUsername, // fixme: authentication
                    thumbnailImage: args.thumbnailImage 
                }
                controller.article.createArticle(data);
            },
            deleteArticle: async function(obj, args, context, info) {
                controller.article.deleteArticleBySlug(args.articleSlug);
            },
            updateArticle: async function(obj, args, context, info) {
                const data = {
                    content: args.content,
                    title: args.title,
                    thumbnailImage: args.thumbnailImage
                }
                controller.article.updateArticleBySlug(args.articleSlug, data);
            }
        }
    }
});

module.exports = {
    articleModule
};