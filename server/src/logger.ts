import { createLogger, format, transports } from "winston";

// Create a Winston logger
const logger = createLogger({
  level: 'info',
  format: format.cli(),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize({ all: true}), format.simple())
    }), // TOOD: add MongoDB transport here
  ],
  exitOnError: false,
});

export default logger;
