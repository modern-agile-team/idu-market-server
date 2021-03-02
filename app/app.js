"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const root = require("./src/apis/root");
const basket = require("./src/apis/interest/routes/routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/api/", root);
app.use("/", basket);

module.exports = app;
