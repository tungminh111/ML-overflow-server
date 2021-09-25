const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Article = require("./article.model");
const Tag = require("./tag.model");

const TagArticle = sequelize.define(
    "TagArticle", // Model name
    {
        articleId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        tagId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
    }
);

TagArticle.belongsTo(Article, { foreignKey: "articleId" });
TagArticle.belongsTo(Tag, { foreignKey: "tagId" });

module.exports = TagArticle;
