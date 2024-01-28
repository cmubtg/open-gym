import * as metadata from '../../data/metadata.json';
import db from '../models/database';
import { DAYS_OF_THE_WEEK, gymNameType } from '../utils/constants';
import { startOfWeek } from '../utils/date';

export const getSpecialHours = async (date: Date, gym: gymNameType) => {
  const hoursData = metadata[gym].hours;
  const startDate = startOfWeek(date);
  const specialHours = await db.getNextWeekGymHours(gym, startDate);
  specialHours.forEach((hours) => {
    const { date, open, close } = hours;
    const day = DAYS_OF_THE_WEEK[date.getDay()];
    hoursData[day] = {
      open: open,
      close: close
    };
  });
  return hoursData;
};