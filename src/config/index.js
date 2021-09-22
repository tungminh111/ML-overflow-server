const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 8080,
    PGUSER: process.env.PGUSER,
    PGHOST: process.env.PGHOST,
    PGPASSWORD: process.env.PGPASSWORD,
    PGDATABASE: process.env.PGDATABASE,
    PGPORT: process.env.PGPORT,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    REDIS_HOST: process.env.REDIS_HOST,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ACCESS_TIME: process.env.JWT_ACCESS_TIME,
};
