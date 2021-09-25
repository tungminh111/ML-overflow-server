const Article = require("../../models/article.model");
const service = require("../../services");
const articleService = service.Article;
const userService = service.User;

let articleListing = {
    getListArticles: async function (articleQuantity) {
        return await articleService.findAll({
            limit: articleQuantity
        });
    },

    createArticle: async function(data) {
        data.slug = "xxx";
        data.authorId = await userService.findOne({
            where: {
                username: data.authorUsername
            },
            attributes: ["id"]
        });
        data.authorId = data.authorId.id;
        console.log("minh", JSON.stringify(data.authorId));
        articleService.create(data);
    },

    getArticleBySlug: async function(slug) {
        const result = await articleService.findOne({
            where: {
                slug: slug
            }
        });
        return result;
    },

    deleteArticleBySlug: async function(slug) {
        articleService.destroy({
            where: {
                slug: slug
            }
        });
    },

    updateArticleBySlug: async function(slug, data) {
        articleService.update(
            data,
            {
                where: {
                    slug: slug
                }
            }
        )
    }
}

module.exports = articleListing;
