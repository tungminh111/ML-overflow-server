const { tagModule } = require("../../modules");
const service = require("../../services");
const tagService = service.Tag;
const tagArticleService = service.TagArticle;
const articleService = service.Article;

const tagController = {
    getListArticleByTags: async function(tags) {
        return await tagService.findAll({
            where: {
                name: tags
            } 
        }).then(tagIds => 
            tagArticleService.findAll({
                where: {
                    tagId: tagIds
                }
            })
        ).then(articleIds => 
            articleService.findAll({
                where: {
                    id: articleIds
                }
            }) 
        );
    },
    getListTags: async function() {
        return await tagService.findAll({
            attributes: ["name"]
        }).then(tagList => tagList.map(tag => tag.name));
    },
    createTagForArticle: async function(data) {
        const articleId = (await articleService.findOne({
            where: {
                slug: data.articleSlug
            },
            attributes: ["id"]
        })).id;
        const tagId = (await tagService.findOne({
            where: {
                name: data.tagName
            },
            attributes: ["id"]
        })).id;
        await tagArticleService.create({
            articleId: articleId,
            tagId: tagId
        });
    },
    createTag: async function(tagName) {
        await tagService.create({name: tagName});
    }
}

module.exports = tagController;