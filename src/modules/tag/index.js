
const { createModule, gql } = require("graphql-modules");
const controller = require("../../controller");
const config = require("../../config");
const { Op } = require("sequelize");
const { Query } = require("pg");

const tagModule = createModule({
    id: "tag",
    dirname: __dirname,
    typeDefs: [
        gql`
            extend type Query {
                listArticleByTags(
                    tags: [String]
                ): [Article]
                listTags: [String]
            }
            extend type Mutation {
                createTag(
                    tagName: String
                ): Response
                createTagForArticle(
                    articleSlug: String
                    tagName: String
                ): Response
            }
        `,
    ],
    resolvers: {
        Query: {
            listArticleByTags: async function(obj, args, context, info) {
                return await controller.tag.getListArticleByTags(obj.tags);
            },
            listTags: async function(obj, args, contex, info) {
                return await controller.tag.getListTags();
            }
        },
        Mutation: {
            createTag: async function(obj, args, context, info) {
                return await controller.tag.createTag(args.tagName);
            },
            createTagForArticle: async function(obj, args, context, info) {
                return await controller.tag.createTagForArticle({
                    articleSlug: args.articleSlug,
                    tagName: args.tagName
                })
            }
        }
    }
});

module.exports = {
    tagModule
};