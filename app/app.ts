import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import * as cors from "cors";
import * as morgan from "morgan";

import logger from "./src/config/logger";

const app: express.Application = express();
dotenv.config();

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(
  morgan("tiny", { stream: { write: (message) => logger.info(message) } })
);

// import view from "./src/apis/view";
import root from "./src/apis/root";
// const search = require(`./src/apis/search`);
// const boards = require(`./src/apis/boards`);
// const notification = require(`./src/apis/notification`);
import sale from "./src/apis/sale-list";
import purchase from "./src/apis/purchase-list";
import watchlist from "./src/apis/watch-list";
import profile from "./src/apis/profile";
import image from "./src/apis/image";

// app.use("/", view);
app.use("/api/", root);
// app.use("/api/search", search);
// app.use("/api/boards", boards);
// app.use("/api/notification", notification);
app.use("/api/sale-list", sale);
app.use("/api/purchase-list", purchase);
app.use("/api/watchlist", watchlist);
app.use("/api/students", profile);
app.use("/api/image", image);

export default app;
