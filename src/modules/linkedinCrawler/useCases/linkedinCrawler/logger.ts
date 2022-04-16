import path from 'path';
import winston from 'winston';
import { LoggerWrapperProps } from './interface';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple(),
    winston.format.timestamp(),
    winston.format.colorize(),
  ),
  transports: [new winston.transports.Console()],
});

const loggerWrapper = (absoluteFilePath: string): LoggerWrapperProps => {
  const file = path.relative(__dirname, absoluteFilePath);
  // Because this file is in the source code root folder, the above will make all paths relative to it: just the info needed for the log.

  return {
    info: (message: string) => logger.info(`[${file}] ${message}`),
    warn: (message: string) => logger.warn(`[${file}] ${message}`),
    error: (message: string, error) =>
      logger.error(
        `[${file}] ${message}${
          error && error.stack ? error.stack : error || ''
        }`,
      ),
    stopLogging: () => {
      logger.silent = true;
    },
  };
};

export default loggerWrapper;
