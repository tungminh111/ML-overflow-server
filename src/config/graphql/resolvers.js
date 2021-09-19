const resolversFunctions = {
    Query: {
        user: async (parent, args, context, info) => {
            return "hello";
        },
    },
};

module.exports = resolversFunctions;
