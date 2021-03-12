"use strict";

// es6+ 문법의 async-await 등 최신 문법을 변환해준다.
require("babel-polyfill");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

let dist = "";
if (process.env.NODE_ENV === "production") dist = "/dist";
const view = require(`.${dist}/src/apis/view`);
const root = require(`.${dist}/src/apis/root`);
const watchList = require(`.${dist}/src/apis/watch-list`);
const image = require(`.${dist}/src/apis/image`);
const search = require(`.${dist}/src/apis/search`);
const boards = require(`.${dist}/src/apis/boards`);
const purchase = require(`.${dist}/src/apis/purchase-list`);
const sale = require(`.${dist}/src/apis/sale-list`);
const profile = require(`.${dist}/src/apis/profile`);

app.use("/", view);
app.use("/api/", root);
app.use("/api/watchlist", watchList);
app.use("/api/image", image);
app.use("/api/search", search);
app.use("/api/boards", boards);
app.use("/api/purchase-list", purchase);
app.use("/api/sale-list", sale);
app.use("/api/students", profile);

module.exports = app;
