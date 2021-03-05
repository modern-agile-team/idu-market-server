"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const view = require("./src/apis/view");
const root = require("./src/apis/root");
const purchase = require("./src/apis/purchaseList/routes/routes");

app.use("/", view);
app.use("/api/", root);
app.use("/api/purchase-list", purchase);

module.exports = app;
