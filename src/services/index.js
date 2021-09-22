const followingService = require("./following.service");
const userService = require("./user.service");

module.exports = {
    User: userService,
    Following: followingService,
};
