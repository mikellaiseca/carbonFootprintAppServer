require("dotenv/config");

require("./db");

const express = require("express");

const app = express();   //creates our app w.express

require("./config")(app);

require("./routes")(app)

require("./error-handling")(app);

module.exports = app;
