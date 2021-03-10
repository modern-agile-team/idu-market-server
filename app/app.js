"use strict";

// es6+ 문법의 async-await 등 최신 문법을 변환해준다.
require("babel-polyfill");

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

let dist = "";
if (process.env.NODE_ENV === "production") dist = "/dist";
const view = require(`.${dist}/src/apis/view`);
const root = require(`.${dist}/src/apis/root`);
const watchList = require("./src/apis/watchlist/routes");
const image = require("./src/apis/image/routes");
const boards = require("./src/apis/boards/index");
const purchase = require("./src/apis/purchase-list/routes");
const sale = require("./src/apis/sale-list/routes");

app.use("/", view);
app.use("/api/", root);
app.use("/api/watchlist", watchList);
app.use("/api/image", image);
app.use("/api/boards", boards);
app.use("/api/purchase-list", purchase);
app.use("/api/sale-list", sale);

module.exports = app;
