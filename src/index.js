const express = require("express");
const app = express();
const { PORT } = require("./config");
const { initDatabase } = require("./config/database");
const User = require("./models/user.model");

initDatabase();

// define a route handler for the default home page
app.get("/", async (req, res) => {
    const newUser = User.build({
        firstName: "Longdz",
    });
    await newUser.save();
    const users = await User.findAll();
    res.json(users);
    // res.send("MINH11");
});

// start the Express server
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
