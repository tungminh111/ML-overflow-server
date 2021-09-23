const { AuthenticationError } = require("apollo-server-errors");
const services = require("../../services");

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

module.exports = {
    updateInformationUser,
    getUsers,
};
