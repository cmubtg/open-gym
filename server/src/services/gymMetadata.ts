import * as metadata from '../../data/metadata.json';
import db from '../models/database';
import { GymName } from '../models/database.types';
import { DAYS_OF_THE_WEEK } from '../utils/constants';
import { startOfWeek } from '../utils/date';

export const getAllMetadataHelper = async () => {
  const date = new Date();
  for (const gymName of db.getGymCollections()) {
    const hours = await getSpecialSchedule(date, gymName);
    metadata[gymName].hours = hours;
  }
  return metadata;

};

export const getGymMetadataHelper = async (gym: GymName) => {
  metadata[gym].hours = await getSpecialSchedule(new Date(), gym);
  return metadata[gym];
};

export const getSpecialSchedule = async (date: Date, gym: GymName) => {
  const hoursData = metadata[gym].hours;
  const startDate = startOfWeek(date);
  const specialHours = await db.getNextWeekGymHours(gym, startDate);
  specialHours.forEach(({ date, open, close, description }) => {
    const day = DAYS_OF_THE_WEEK[date.getDay()];
    hoursData[day] = {
      open,
      close,
      description: description ?? "Special Hours"
    };
  });
  return hoursData;
};
