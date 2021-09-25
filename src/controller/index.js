const articleController = require("./article-controller");
const userController = require("./user-controller");
const authenticationController = require("./authentication-controller");
const favoriteController = require("./favorite-controller");

let controller = {
    article: articleController,
    user: userController,
    authentication: authenticationController,
    favorite: favoriteController,
};

module.exports = controller;
