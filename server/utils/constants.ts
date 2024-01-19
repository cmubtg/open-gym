import dotenv from 'dotenv';
dotenv.config(); // load env variables

export const MONGO_URI = process.env.MONGO_URI ?? '';

export const PORT = process.env.PORT ?? '';

export const METADATA = 'metadata';

export const NO_ONE = 0;

export const DAYS_OF_THE_WEEK: string[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export enum HTTP_STATUS {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}
