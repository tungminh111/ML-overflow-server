const articleService = require("./article.service");
const followingService = require("./following.service");
const userService = require("./user.service");

module.exports = {
    User: userService,
    Article: articleService,
    Following: followingService,
};
