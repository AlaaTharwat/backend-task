import { NextFunction, Request } from 'express';
import winston = require("winston");


function loggerMiddleware() {
    process.on("uncaughtException", (ex) => {
        winston.error(ex.message, ex);
        process.exit(1);
    });

    process.on("unhandledRejection", (ex:Error) => {
        winston.error(ex.message, ex);
        process.exit(1);
    });
    winston.add(new winston.transports.File({ filename: "logfile.log" }));
    winston.add(new winston.transports.Console());
    // console.log(`${request.method} ${request.path}`);
}

export default loggerMiddleware;



