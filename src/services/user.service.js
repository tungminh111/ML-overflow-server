const config = require("../config");
const User = require("../models/user.model");
const CryptoJS = require("crypto-js");
const BaseService = require("./base.service");

/**
 * @param {Object} data thong tin user
 * @param {string} data.firstName ten dau tien cua no
 */
class UserService extends BaseService{
    constructor() {
        super("userService", User);
    }

    async update(params) {
        const updateInfo = {};
        if (params.name) {
            updateInfo.name = params.name;
        }
        if (params.avatar) {
            updateInfo.avatar = params.avatar;
        }
        return await User.update(updateInfo, { where: { id: params.userId } });
    }

    async updatePassword(params) {
        const newEncryptedPassword = CryptoJS.HmacSHA256(
            params.newPassword,
            config.PRIVATE_KEY
        ).toString();
        return await User.update(
            {
                password: newEncryptedPassword,
            },
            { where: { id: params.userId } }
        );
    }
}

const userService = new UserService(); 

module.exports = userService;
