/**
 * Gets a Date object in EST timezone
 * @param date Optional date to convert. If not provided, uses current time
 * @returns Date object in EST timezone
 */
export const getESTDate = (date?: Date | string | number) => {
  // If no date provided, use current time
  const inputDate = date ? new Date(date) : new Date();
  return new Date(
    inputDate.toLocaleString("en-US", { timeZone: "America/New_York" })
  );
};

/**
 * Computes a relative date based on
 * a given date and change of days in EST timezone
 * @param date anchor date
 * @param dayDelta change in days
 * @returns relative date
 */
export const relativeDate = (date: Date, dayDelta: number) => {
  const estDate = getESTDate(date);
  estDate.setDate(estDate.getDate() + dayDelta);
  estDate.setHours(0, 0, 0, 0);
  return estDate;
};

/**
 * @param date date to be modified
 * @param time time of the format HH:MM
 * @returns the date with the time set to the given time in EST timezone
 */
export const dateFromClock = (date: Date, time: string) => {
  const [hour, minute] = time.split(":").map((x) => parseInt(x, 10));
  const estDate = getESTDate(date);
  estDate.setHours(hour, minute);
  return estDate;
};

/**
 * @param date date to be modified
 * @param n nth hour of the day
 * @returns the date with the time set to the nth hour in EST timezone
 */
export const nthHour = (date: Date, n: number) => {
  const estDate = getESTDate(date);
  estDate.setHours(n, 0, 0, 0);
  return estDate;
};

/**
 * @param date date to be modified
 * @returns the date at the start of the week in EST timezone
 */
export const startOfWeek = (date: Date) => {
  const estDate = getESTDate(date);
  return relativeDate(estDate, -estDate.getDay());
};

/**
 * @param date date to be modified
 * @returns the date rounded to the nearest minute in EST timezone
 */
export const timeRoundedToNearestMinute = (date: Date) => {
  const estDate = getESTDate(date);
  const roundedMinutes = Math.round(estDate.getSeconds() / 60) * 60;
  estDate.setSeconds(roundedMinutes);
  return estDate;
};
