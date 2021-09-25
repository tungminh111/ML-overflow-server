const Following = require("../models/following.model");
const BaseService = require("./base.service");

const followingService = new BaseService("followingService", Following);

module.exports = followingService;
