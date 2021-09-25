const BaseService = require("./base.service");
const Article = require("../models/article.model");

const articleService = new BaseService("articleService", Article);

module.exports = articleService;