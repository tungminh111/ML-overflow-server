const TagArticle = require("../models/tag_article.model");
const BaseService = require("./base.service");

const tagArticleService = new BaseService("tagArticleService", TagArticle);

module.exports = tagArticleService;
