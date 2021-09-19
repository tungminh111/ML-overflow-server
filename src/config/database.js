const { Sequelize } = require("sequelize");
const {
    PORT,
    PGDATABASE,
    PGHOST,
    PGPASSWORD,
    PGPORT,
    PGUSER,
} = require("./index");

const sequelize = new Sequelize(
    `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`
);

const initDatabase = async () => {
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
};

module.exports = {
    sequelize: sequelize,
    initDatabase,
};
