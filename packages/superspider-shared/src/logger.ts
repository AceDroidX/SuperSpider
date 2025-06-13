import winston from 'winston';
import { format, transports } from 'winston';
import type { TimestampOptions } from 'logform';
const { combine, timestamp, label, printf } = format;
import 'winston-mongodb'
import { getTime } from './utils.ts';

class MyTimestamp implements TimestampOptions {
    format() {
        return getTime();
    }
}

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
});
const logger = winston.createLogger({
    level: 'debug',
    format: combine(
        label({ label: 'default' }),
        timestamp(new MyTimestamp()),
        myFormat
    ),
    // defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'log/info.log', level: 'info' }),
        new winston.transports.File({ filename: 'log/warn.log', level: 'warn' }),
        new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'log/combined.log' }),
        new transports.Console({ format: combine(winston.format.colorize(), timestamp(), myFormat) }),
    ],
});

export default logger

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({
//         format: winston.format.simple(),
//     }));
// }
