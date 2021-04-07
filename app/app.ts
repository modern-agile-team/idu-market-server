import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import * as cors from "cors";
import * as morgan from "morgan";

// import logger from "./config/logger";

const app: express.Application = express();
dotenv.config();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// app.use(morgan("tiny", { stream: logger.stream }));

// import view from "./src/apis/view";
import root from "./src/apis/root";
// const watchList = require(`./src/apis/watch-list`);
// const image = require(`./src/apis/image`);
// const search = require(`./src/apis/search`);
// const boards = require(`./src/apis/boards`);
// const purchase = require(`./src/apis/purchase-list`);
// const sale = require(`./src/apis/sale-list`);
// const notification = require(`./src/apis/notification`);
// const profile = require(`./src/apis/profile`);

// app.use("/", view);
// app.use("/api/", root);
// app.use("/api/watchlist", watchList);
// app.use("/api/image", image);
// app.use("/api/search", search);
// app.use("/api/boards", boards);
// app.use("/api/purchase-list", purchase);
// app.use("/api/sale-list", sale);
// app.use("/api/notification", notification);
// app.use("/api/students", profile);

export default app;
