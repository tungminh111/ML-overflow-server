const articleController = require("./article-controller");
const userController = require("./user-controller");
const authenticationController = require("./authentication-controller");
const tagController = require("./tag");

let controller = {
    article: articleController,
    user: userController,
    authentication: authenticationController,
    tag: tagController
};

module.exports = controller;
