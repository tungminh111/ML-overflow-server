const articleService = require("./article.service");
const followingService = require("./following.service");
const userService = require("./user.service");


const InitData = [
    {
        username: "tungminh111",
        password: "mmm"
    }
]

InitData.forEach(data => userService.create(data));


module.exports = {
    User: userService,
    Article: articleService,
    Following: followingService,
};
