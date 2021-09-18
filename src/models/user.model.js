const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

// How to define a model? I knewn you would ask this, hahaha! 
// Follow instruction here: https://sequelize.org/master/manual/model-basics.html

const User = sequelize.define(
    "User", // Model name
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
        },
    },
    {
        // tableName: 'user'
    }
);

module.exports = User;
