const { AuthenticationError } = require("apollo-server-errors");
const services = require("../../services");
const CryptoJS = require("crypto-js");
const { Op } = require("sequelize");
const config = require("../../config");

const getUsers = (parent, args, context, info) => {
    const { isAuthenticated, userId, authenticatedErrorMsg } = context;
    if (!isAuthenticated) throw new AuthenticationError(authenticatedErrorMsg);
    return services.User.findAll();
};

const updateInformationUser = async (parent, args, context, info) => {
    const { isAuthenticated, userId, authenticatedErrorMsg } = context;
    if (!isAuthenticated || userId !== args.userId)
        throw new AuthenticationError(authenticatedErrorMsg);

    const result = await services.User.update({
        userId,
        name: args.name,
        avatar: args.avatar,
    });
    return {
        message: "Success",
        success: true,
    };
};

const changePassword = async (parent, args, context, info) => {
    const { isAuthenticated, userId, authenticatedErrorMsg } = context;
    if (!isAuthenticated)
        throw new AuthenticationError(authenticatedErrorMsg);
    const user = await services.User.findOne({
        where: {
            id: {
                [Op.eq]: userId,
            },
        },
    });
    
    const userDataValue = user.toJSON();
    
    const trueEncryptedPassword = userDataValue.password;
    const encryptedPassword = CryptoJS.HmacSHA256(
        args.oldPassword,
        config.PRIVATE_KEY
    ).toString();

    // confirm oldPassword user typed is correct
    if (encryptedPassword === trueEncryptedPassword) {
        services.User.updatePassword({
            userId: userId,
            newPassword: args.newPassword,
        });
        return {
            message: "Success",
            success: true,
        };
    } else {
        return {
            message: "Old password is not correct",
            success: false,
        };
    }
};

module.exports = {
    updateInformationUser,
    getUsers,
    changePassword,
};
