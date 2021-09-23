const articleService = require("./article.service");
const userService = require("./user.service");

module.exports = {
    User: userService,
    Article: articleService
};
