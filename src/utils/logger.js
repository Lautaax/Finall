import winston from "winston"
import __dirname from "../dirname.js";
import config from "../config.js";
const { loggermode } = config
const customLevelOptions = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    },
    colors: {
        debug: "white",
        http: "green",
        info: "blue",
        warning: "yellow",
        error: "red",
        fatal: "magenta"
    }
}

const logger = winston.createLogger({
    levels: customLevelOptions.levels,

    transports: [

        new winston.transports.Console({

            levels: customLevelOptions.levels,
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({
            filename: "./logs/errors.log",
            level: "error",
        }),
    ],
});

export const winstonLogger = (req, res, next) => {
    req.logger = logger;
    if (loggermode === "DEVELOPMENT") {
        req.logger.debug(
            `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()}`
        );
    } else {
        req.logger.info(
            `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()}`
        );
    }
    next();
};

// const logger = mode === false ? productionLogger : developmentLogger;

// export { logger };
