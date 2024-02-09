/**
 * Computes a relative date based on 
 * a given date and change of days
 * @param date anchor date
 * @param dayDelta change in days
 * @returns relative date
 */
export function getRelativeDate(date: Date, dayDelta: number) {
  const relDate = new Date(date);
  relDate.setDate(date.getDate()+dayDelta);
  relDate.setHours(0,0,0,0);
  return relDate;
}