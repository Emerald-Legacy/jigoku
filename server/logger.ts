import * as winston from 'winston';
import 'winston-daily-rotate-file';

const rotate = new winston.transports.DailyRotateFile({
    filename: __dirname + '/logs/ringteki',
    datePattern: '-yyyy-MM-dd.log',
    json: false,
    zippedArchive: true
});

const logLevel = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug');

export const logger = winston.createLogger({
    level: logLevel,
    transports: [new winston.transports.Console(), rotate],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.printf(info => `${info.timestamp} - ${info.level}: ${info.message}`)
    )
});
