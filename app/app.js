const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("../app/src/config/logger");

const app = express();
dotenv.config();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan("tiny", { stream: logger.stream }));

const view = require(`./src/apis/view`);
const root = require(`./src/apis/root`);
const watchList = require(`./src/apis/watch-list`);
const image = require(`./src/apis/image`);
const search = require(`./src/apis/search`);
const boards = require(`./src/apis/boards`);
const purchase = require(`./src/apis/purchase-list`);
const sale = require(`./src/apis/sale-list`);
const notification = require(`./src/apis/notification`);
const profile = require(`./src/apis/profile`);

app.use("/", view);
app.use("/api/", root);
app.use("/api/watchlist", watchList);
app.use("/api/image", image);
app.use("/api/search", search);
app.use("/api/boards", boards);
app.use("/api/purchase-list", purchase);
app.use("/api/sale-list", sale);
app.use("/api/notification", notification);
app.use("/api/students", profile);
console.log("배포 자동화 테스트");
module.exports = app;
