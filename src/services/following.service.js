const Following = require("../models/following.model");

/**
 * @param {Object} data thong tin user
 * @param {string} data.userId
 * @param {string} data.authorId
 */
const create = async (data) => {
    const newFollowing = Following.build(data);
    return await newFollowing.save();
};

module.exports = {
    findAll: async (...params) => {
        const followings = await Following.findAll(...params);
        return followings;
    },
    create,
};
