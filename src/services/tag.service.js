
const Tag = require("../models/tag.model");
const BaseService = require("./base.service");

const tagService = new BaseService("tagService", Tag);

const tagsData = [
];
tagsData.forEach(tag => tagService.create(tag));

module.exports = tagService;