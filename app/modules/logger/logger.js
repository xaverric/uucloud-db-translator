const winston = require('winston');
const os = require("os");
const path = require('path');

const customFileFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(({level, message, timestamp}) => {
        return `${timestamp} - [${level.toUpperCase()}]: ${message}`;
    })
);

const customConsoleFormat = winston.format.printf(({message}) => {
    return `${message}`;
});

const options = {
    fileDebug: {
        level: 'debug',
        filename: path.join(os.homedir(), '.uucloud-db-translator', 'logs', 'debug.log'),
        format: customFileFormat,
        handleExceptions: true,
        maxsize: 5242880,
        maxFiles: 5
    },
    console: {
        level: 'debug',
        format: customConsoleFormat,
        handleExceptions: true,
        colorize: true
    },
    consoleWithTime: {
        level: 'debug',
        format: customFileFormat,
        handleExceptions: true,
        colorize: true
    }
};

const transports = {
    fileDebug: new winston.transports.File(options.fileDebug),
    console: new winston.transports.Console(options.console),
    consoleWithTIme: new winston.transports.Console(options.consoleWithTime)
};

const CONSOLE_LOG = winston.createLogger({
    transports: [
        transports.fileDebug,
        transports.console
    ],
    exitOnError: false
});

const CONSOLE_TIME_LOG = winston.createLogger({
    transports: [
        transports.fileDebug,
        transports.consoleWithTIme
    ],
    exitOnError: false
});

const LOG = winston.createLogger({
    transports: [
        transports.fileDebug
    ],
    exitOnError: false
});

module.exports = {
    CONSOLE_LOG,
    CONSOLE_TIME_LOG,
    LOG
};
