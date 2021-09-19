const User = require("../models/user.model");

/**
 * @param {Object} data thong tin user
 * @param {string} data.firstName ten dau tien cua no
 */
const create = async (data) => {
    const newUser = User.build(data);
    return await newUser.save();
};

module.exports = {
    findAll: async (...params) => {
        const users = await User.findAll(...params);
        return users

    },
    create,
};
