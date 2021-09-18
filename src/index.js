const express = require("express");
const app = express();
const { PORT } = require("./config");
const { initDatabase } = require("./config/database");
const service = require("./services");

initDatabase();

// define a route handler for the default home page
app.get("/", async (req, res) => {
    await service.User.create({
        firstName: "Longdz",
    });
    const users = await service.User.findAll();
    res.json(users);
});

// start the Express server
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
