import winston, { format } from "winston";
import path from "path"
import __dirname from "../utils.js";
import { options } from "../config/config.js";

const customLevelWinston = {
    levels : {
        fatal : 0, 
        error : 1,
        warning : 2,
        info : 3,
        http : 4,
        debug : 5,
    }
}

const devLogger = winston.createLogger({
    levels: customLevelWinston.levels,
    format: format.combine (format.simple()),
    transports:[
        new winston.transports.Console({level:"debug"})
    ]
});

const prodLogger = winston.createLogger({
    levels: customLevelWinston.levels,

    transports:[
        new winston.transports.Console({ level: "info"}),
        new winston.transports.File({filename: path.join(__dirname,"/logs/errors.log"), level:"error" })
    ]
});

const currentEnv = options.server.nodeEnv || "development";

export const addLoggerReq = (req,res,next)=>{
    if(currentEnv === "development"){
        req.logger = devLogger
    } else {
        req.logger = prodLogger
    }
    req.logger.http(`${req.url} - method: ${req.method}`);
    next();
};

export const addLogger = ()=>{
    let currentLogger;

    if(currentEnv === "development"){
        currentLogger=devLogger;
    } else {
        currentLogger=prodLogger;
    }
    return currentLogger;
};