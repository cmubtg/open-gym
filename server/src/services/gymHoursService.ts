import * as metadata from '../../data/metadata.json';
import db from '../models/database';
import { GymName } from '../models/database.types';
import { DAYS_OF_THE_WEEK } from '../utils/constants';
import { getDateFromClock, getRelativeDate, startOfWeek } from '../utils/date';

export const getSpecialSchedule = async (date: Date, gym: GymName) => {
  const hoursData = metadata[gym].hours;
  const specialHours = await db.getGymHours({
    gym: gym,
    dateRange: {
      start: startOfWeek(date),
      end: getRelativeDate(date, 6)
    }
  });

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

export const isClosed = async (gym: string, date: Date) => {
  const hours = await getSpecialSchedule(date, gym as GymName);
  const day = DAYS_OF_THE_WEEK[date.getDay()];
  const openDate = getDateFromClock(date, hours[day].open);
  const closeDate = getDateFromClock(date, hours[day].close);

  return openDate.getTime() > date.getTime() ||
          date.getTime() > closeDate.getTime();
};