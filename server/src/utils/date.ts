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

/**
 * @param date date to be modified
 * @param time time of the format HH:MM
 * @returns the date with the time set to the given time
 */
export const getDateFromClock = (date: Date, time: string) => {
  const [hour, minute] = time.split(':').map(x => parseInt(x, 10));
  const newDate = new Date(date);
  newDate.setHours(hour);
  newDate.setMinutes(minute);
  return newDate;
};

/**
 * @param date date to be modified
 * @param n nth hour of the day
 * @returns the date with the time set to the nth hour
 */
export const getNthHour = (date: Date, n: number) => {
  date.setHours(n, 0, 0, 0);
  return date;
};

/**
 * @param date date to be modified
 * @returns the date at the start of the week
 */
export const startOfWeek = (date: Date) => {
  return getRelativeDate(date, -date.getDay());
};
