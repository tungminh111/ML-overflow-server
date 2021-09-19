const express = require("express");
const config = require("./config");
const app = express();
const { PORT } = require("./config");
const { initDatabase } = require("./config/database");
const { startApolloServer } = require("./config/graphql/apollo-server");

initDatabase();

startApolloServer(app);

// define a route handler for the default home page
app.get("/", async (req, res) => {
    res.send(
        `<h1 style="text-align: center; margin-top:100px;">
            Nothing here! You can explore graphql servers <a href="http://localhost:${config.PORT}/graphql">here</a>
        </h1>`
    );
});