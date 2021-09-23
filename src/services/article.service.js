
const Article = require("../models/article.model");

const create = async (data) => {
    const newArticle = Article.build(data);
    return await newArticle.save();
};

module.exports = {
    findOne: async (...params) => {
        const article = await Article.findOne(...params);
        return article;
    },
    findAll: async (...params) => {
        const articles = await Article.findAll(...params);
        return articles;
    },
    create,
};
