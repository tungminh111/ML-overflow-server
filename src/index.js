const express = require("express");
const app = express();
const { PORT } = require("./config");
const {initDatabase} = require("./config/database")
const User = require("./models/user.model");

initDatabase()

// define a route handler for the default home page
app.get("/", (req, res) => {
    const newUser = User.build({
        firstName: "Longdz"
    })
    newUser.save()
    res.send(`User ${newUser.firstName} have created`);
});

// start the Express server
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
