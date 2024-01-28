export const METADATA = 'metadata';

export const GYM_HOURS = 'gymHours';

export const NO_ONE = 0;

export type gymNameType = 'cohonFC' | 'tepperFC' | 'fairfax' | 'wiegand';

export const GYM_NAMES = ['cohonFC', 'tepperFC', 'fairfax', 'wiegand'] as const;

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
