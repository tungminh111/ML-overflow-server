const User = require("../models/user.model");

/**
 * @param {Object} data thong tin user
 * @param {string} data.firstName ten dau tien cua no
 */
const create = async (data) => {
    const newUser = User.build(data);
    return await newUser.save();
};

/**
 * @param {Object} params
 * @param {string} params.userId
 * @param {string} params.name
 * @param {string} params.avatar
 */
const update = async (params) => {
    const updateInfo = {};
    if (params.name) {
        updateInfo.name = params.name;
    }
    if (params.avatar) {
        updateInfo.avatar = params.avatar;
    }
    return await User.update(updateInfo, { where: { id: params.userId } });
};

module.exports = {
    update,
    findOne: async (...params) => {
        const user = await User.findOne(...params);
        return user;
    },
    findAll: async (...params) => {
        const users = await User.findAll(...params);
        return users;
    },
    create,
};
