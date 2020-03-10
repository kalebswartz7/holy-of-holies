const express = require("express");
const bodyParser = require("body-parser")
const bibleRoutes = require("./routes/bible");
const mongoose = require("mongoose");
const secrets = require("./secrets");
const app = express(); 
const cors = require('cors');

app.use(cors());
app.use("/", bibleRoutes);
module.exports = app;


