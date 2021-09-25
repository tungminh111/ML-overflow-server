const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Tag = sequelize.define(
    "Tag", // Model name
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    }
);

module.exports = Tag;
