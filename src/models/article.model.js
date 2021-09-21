
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Article = sequelize.define(
    "Article", // Model name
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
);

module.exports = Article;
