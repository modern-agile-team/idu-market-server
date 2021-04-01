var _a = require("winston"), transports = _a.transports, createLogger = _a.createLogger, format = _a.format;
var combine = format.combine, timestamp = format.timestamp, printf = format.printf, colorize = format.colorize, simple = format.simple;
require("winston-daily-rotate-file");
var printFormat = printf(function (_a) {
    var timestamp = _a.timestamp, level = _a.level, message = _a.message;
    return timestamp + "  " + level + " : " + message;
});
var printLogFormat = {
    file: combine(timestamp({
        format: "YYYY-MM-DD HH:mm:dd",
    }), printFormat),
    console: combine(colorize(), simple()),
};
var opts = {
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
var logger = createLogger({
    transports: [opts.file],
});
if (process.env.NODE_ENV !== "prodction") {
    logger.add(opts.console);
}
logger.stream = {
    write: function (message) { return logger.info(message); },
};
module.exports = logger;
