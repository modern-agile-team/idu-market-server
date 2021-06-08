import { transports, createLogger, format } from "winston";
const { combine, printf, colorize, simple } = format;
import "winston-daily-rotate-file";
import * as fecha from "fecha";
const moment = require("moment");

const printFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level} : ${message}`;
});

const timestamp = format((info: any, opts: any = {}) => {
  if (opts.format) {
    info.timestamp =
      typeof opts.format === "function"
        ? opts.format()
        : fecha.format(moment(), opts.format);
  }

  if (!info.timestamp) {
    info.timestamp = moment().format().replace(/T/, " ").replace(/\+.+/, "");
  }

  if (opts.alias) {
    info[opts.alias] = info.timestamp;
  }

  return info;
});

const printLogFormat = {
  file: combine(timestamp(), printFormat),

  console: combine(colorize(), simple()),
};

const opts = {
  file: new transports.DailyRotateFile({
    filename: "%DATE%.log",
    dirname: "./logs",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    format: printLogFormat.file,
  }),

  console: new transports.Console({
    level: "info",
    format: printLogFormat.console,
  }),
};

const logger = createLogger({
  transports: [opts.file],
});

if (process.env.NODE_ENV !== "prodction") {
  logger.add(opts.console);
}

export default logger;
