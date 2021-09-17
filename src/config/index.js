const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 8080,
    PGUSER: process.env.PGUSER,
    PGHOST: process.env.PGHOST,
    PGPASSWORD: process.env.PGPASSWORD,
    PGDATABASE: process.env.PGDATABASE,
    PGPORT: process.env.PGPORT,
}