import winston from "winston";
import config from "../config.json";

export const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: config[process.env.NODE_ENV].LOG_LEVEL,
      colorize: true,
      timestamp: true,
      prettyPrint: true,
      label: "server"
    })
  ]
});

// create stream for morgan
logger.stream = {
  write: message => logger.info(message)
};
