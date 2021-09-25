const models = require("../models");

/**
 * @param {Object} data thong tin user
 * @param {string} data.userId
 * @param {string} data.authorId
 */
const create = async (data) => {
    const newFavorite = models.Favorite.build(data);
    return await newFavorite.save();
};

module.exports = {
    findAll: async (...params) => {
        const favorites = await models.Favorite.findAll(...params);
        return favorites;
    },
    create,
};
