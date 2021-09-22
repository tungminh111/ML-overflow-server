const config = require("../config");
const jwt = require("jsonwebtoken");

const Helpers = {
    generateAccessToken: (userId, username) => {
        const accessToken = jwt.sign(
            {
                sub: userId,
                username: username,
            },
            config.JWT_ACCESS_SECRET,
            {
                expiresIn: config.JWT_ACCESS_TIME + "s",
            }
        );
        return accessToken;
    },
};

module.exports = Helpers;
