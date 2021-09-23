
const { DataTypes, UUIDV4 } = require("sequelize");
const { sequelize } = require("../config/database");

const Article = sequelize.define(
    "Article", // Model name
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            field: 'title'
        },
        content: {
            type: DataTypes.STRING
        },
        createDate: {
            type: DataTypes.DATE
        },
        authorId: {
            type: DataTypes.UUID
        },
        slug: {
            type: DataTypes.STRING,
        },
        thumbnailImage: {
            type: DataTypes.STRING
        }

    },
    {
        indexes: [
            {
                fields: ['title']
            }
        ]
    }
);

module.exports = Article;
