import util from "util";
import { createLogger, format, transports } from "winston";
import config from "@/config";
import { DataFormat } from "@/utils";

/**
 * This function makes `winston` logging library work like `console.log`
 */
const utilFormatter = format((info: any) => {
  const args = info[Symbol.for("splat")];
  if (args) {
    info.message = util.format(info.message, ...args);
  }
  return info;
});

// Create format based on environment
const consoleFormat = config.isProduction
  ? format.combine(
      utilFormatter(),
      format.colorize(),
      format.printf(
        ({ level, message, label }) => `${label || "-"} ${level}: ${message}`
      )
    )
  : format.combine(
      format.timestamp({ format: DataFormat }),
      utilFormatter(),
      format.colorize(),
      format.printf(
        ({ level, message, label, timestamp }) =>
          `${timestamp} ${label || "-"} ${level}: ${message}`
      )
    );

// Create a filter to control debug logs based on DEBUG environment variable
const debugFilter = format((info) => {
  if (info.level === "debug" && !config.debugMode) {
    return false; // Filter out debug logs when DEBUG is false
  }
  return info;
});

// Create the Winston logger
export const logger = createLogger({
  level: config.debugMode ? "debug" : "info",
  exitOnError: false,
  format: format.combine(
    debugFilter(), // Apply debug filtering
    format.json()
  ),
  transports: [
    new transports.Console({
      format: consoleFormat,
    }),
  ],
});
