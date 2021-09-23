const service = require("../../services");
const articleService = service.Article;

let articleListing = {
    getListArticles: function (articleQuantity) {
        return articleService.findAll({
            limit: articleQuantity
        })
    },

    createArticle: function(data) {
        data.slug = "xxx";
        articleService.create(data);
    }
}

module.exports = articleListing;
