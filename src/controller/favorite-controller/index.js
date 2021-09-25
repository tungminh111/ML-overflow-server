const { AuthenticationError } = require("apollo-server-errors");
const services = require("../../services");

const getFavorites = async (parent, args, context, info) => {
    const { isAuthenticated, userId, authenticatedErrorMsg } = context;
    if (!isAuthenticated) throw new AuthenticationError(authenticatedErrorMsg);
    return services.Favorite.findAll();
};

const addFavorite = async (parent, args, context, info) => {
    const { isAuthenticated, userId, authenticatedErrorMsg } = context;

    if (!isAuthenticated) throw new AuthenticationError(authenticatedErrorMsg);

    const { articleId } = args;

    await services.Favorite.create({
        userId,
        articleId,
    });

    return {
        message: "Success",
        success: true,
    };
};

module.exports = {
    getFavorites,
    addFavorite,
};
