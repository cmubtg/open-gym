import * as metadata from '../../data/metadata.json';
import db from '../models/database';
import { DAYS_OF_THE_WEEK } from '../utils/constants';
import { GymName } from '../types';
import { startOfWeek } from '../utils/date';

export const getWeekSchedule = async (date: Date, gym: GymName) => {
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