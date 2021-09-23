const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./user.model");

const Following = sequelize.define(
    "Following", // Model name
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

Following.belongsTo(User, { foreignKey: "userId" });
Following.belongsTo(User, { foreignKey: "authorId" });

module.exports = Following;
