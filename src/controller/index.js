const articleController = require("./article-controller");
const userController = require("./user-controller");
const authenticationController = require("./authentication-controller");

let controller = {
    article: articleController,
    user: userController,
    authentication: authenticationController,
};

module.exports = controller;
