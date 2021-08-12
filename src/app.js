const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const indexRoute = require("./routes");
config();

require("./utils/db");

app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoute);

module.exports = app;
