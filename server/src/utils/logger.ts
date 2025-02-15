import util from "util";
import { createLogger, format, transports } from "winston";
import config from "@/config";
import { DataFormat } from "@/utils";

/**
 * This function makes `winston` logging library work like `console.log`
 */
const utilFormatter = format((info: any) => {
  const args = info[Symbol.for('splat')];
  if (args) { info.message = util.format(info.message, ...args); }
  return info;
});

// Create a Winston logger
export const logger = createLogger({
  level: 'info',
  exitOnError: false,
});

// Remove timestamp from logger if it's production
if (!config.isProduction) {
  logger.add(new transports.Console({
    format: format.combine(
      format.timestamp({format: DataFormat}),
      utilFormatter(),
      format.colorize(),
      format.printf(({level, message, label, timestamp}) => `${timestamp} ${label || '-'} ${level}: ${message}`),
    ),
  }));
} else {
  logger.add(new transports.Console({
    format: format.combine(
      utilFormatter(),
      format.colorize(),
      format.printf(({level, message, label}) => `${label || '-'} ${level}: ${message}`),
    ),
  }));
}
