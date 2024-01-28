import * as metadata from '../../data/metadata.json';
import { DAYS_OF_THE_WEEK, GYM_NAMES, gymNameType } from '../utils/constants';
import db from '../models/database';

const appendMetadataHours = async (date: Date, gym: gymNameType) => {
  const specialHours = await db.getNextWeekGymHours(gym, date);
  specialHours.forEach((hours) => {
    const { date, open, close } = hours;
    const day = DAYS_OF_THE_WEEK[date.getDay()];
    metadata[gym].hours[day] = {
      open: open,
      close: close
    };
  });
};

export const getAllMetadataHelper = async () => {
  const currentDate = new Date();
  for (const gym of GYM_NAMES) {
    await appendMetadataHours(currentDate, gym);
  }
  return metadata;
};

export const getGymMetadataHelper = async (gym: gymNameType) => {
  const currentDate = new Date();
  await appendMetadataHours(currentDate, gym);
  return metadata[gym];
};
