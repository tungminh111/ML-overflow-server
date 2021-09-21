const { DataTypes, UUIDV4 } = require("sequelize");
const { sequelize } = require("../config/database");

// How to define a model? I knew you would ask this, hahaha!
// Follow instruction here: https://sequelize.org/master/manual/model-basics.html

const User = sequelize.define(
    "User", // Model name
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
        },
    }
);

module.exports = User;
