const service = require("../../services");
const articleService = service.Article;
const userService = service.User;

let articleListing = {
    getListArticles: function (articleQuantity) {
        return articleService.findAll({
            limit: articleQuantity
        })
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
    }
}

module.exports = articleListing;
