import { transports, createLogger, format } from "winston";
const { combine, timestamp, printf, colorize, simple } = format;
import "winston-daily-rotate-file";

const printFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level} : ${message}`;
});

const printLogFormat = {
  file: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:dd",
    }),
    printFormat
  ),

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
