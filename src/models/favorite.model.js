const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./user.model");
const Article = require("./article.model");

const Favorite = sequelize.define(
    "Favorite", // Model name
    {
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        authorId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
    }
);

Favorite.belongsTo(User, { foreignKey: "userId" });
Favorite.belongsTo(Article, { foreignKey: "articleId" });

module.exports = Favorite;
