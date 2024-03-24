/**
 * Computes a relative date based on
 * a given date and change of days
 * @param date anchor date
 * @param dayDelta change in days
 * @returns relative date
 */

export const getRelativeDate = (date: Date, dayDelta: number) => {
  const relDate = new Date(date);
  relDate.setDate(date.getDate()+dayDelta);
  relDate.setHours(0, 0, 0, 0);
  return relDate;
};

export const getDateFromClock = (date: Date, time: string) => {
  const [hour, minute] = time.split(':').map(x => parseInt(x, 10));
  const newDate = new Date(date);
  newDate.setHours(hour);
  newDate.setMinutes(minute);
  return newDate;
};

export const getNthHour = (date: Date, n: number) => {
  date.setHours(n, 0, 0, 0);
  return date;
};

export const startOfDay = (date: Date) => {
  return new Date(date.setHours(0, 0, 0, 0));
};

export const endOfDay = (date: Date) => {
  return new Date(date.setUTCHours(23, 59, 59, 999));
};

export const startOfWeek = (date: Date) => {
  return new Date(date.setDate(date.getDate() - date.getDay()));
};
