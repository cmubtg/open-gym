// Define the array of gym names
export const GYM_NAMES = ["tepperFC", "fairfax", "cohonFC", "wiegand"] as const;

// Define GymName type from constant array
export type GymName = (typeof GYM_NAMES)[number];

// Enum for MongoDB collection names
export enum OccupancyCollection {
  Aggregate = "aggregate",
  Current = "current",
  Forecast = "forecast",
}

export const LogCollection = "log";

export const GymHoursCollection = "gymHours";

// Constant for NO_ONE
export const NO_ONE = 0;

// Days of the week as an array
export const DAYS_OF_THE_WEEK = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

// Enum for HTTP status codes
export enum HttpStatus {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500,
}
