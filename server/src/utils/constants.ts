export const GYM_NAMES = ['tepperFC', 'fairfax', 'cohonFC', 'wiegand'] as const;

export enum TENSE {
  PAST = "past",
  PRESENT = "present",
  FUTURE = "future",
}
export const NO_ONE = 0;

export const DAYS_OF_THE_WEEK = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

export enum HTTP_STATUS {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}
