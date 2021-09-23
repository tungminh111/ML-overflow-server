const { commonModule } = require("./common-module");
const { userModule } = require("./user");
const { articleModule } = require("./article");
const { authenticationModule } = require("./authentication");
const { followingModule } = require("./following");

module.exports = {
    commonModule,
    userModule,
    articleModule,
    authenticationModule,
    followingModule,
};
