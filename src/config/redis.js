const { createClient } = require("redis");
const config = require(".");

const redisClient = createClient({
    socket: {
        host: config.REDIS_HOST,
        port: 6379,
    },
});

module.exports = {
    redisClient,
};
