// Define the array of gym names
export const GYM_NAMES = ['tepperFC', 'fairfax', 'cohonFC', 'wiegand'] as const;

// Enum for MongoDB collection names
export enum Collection {
  Aggregate = "aggregate",
  Current = "current",
  Forecast = "forecast",
}

// Constant for NO_ONE
export const NO_ONE = 0;

// Days of the week as an array
export const DAYS_OF_THE_WEEK = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

// Enum for HTTP status codes
export enum HttpStatus {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}
