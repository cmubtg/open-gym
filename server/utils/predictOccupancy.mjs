import * as Constants from '../utils/constants.mjs';
import * as db from '../models/database.mjs';
import util from 'util';
import { exec } from 'child_process';

const isHoliday = (date) => {
  return true;
};

const isStartOfSemester = (date) => {
  return false;
};

const getTemperature = () => {
  return 72.0;
};

const isWeekend = (date) => {
  return date.getDay() % 6 === 0;
};

const execAsync = util.promisify(exec);


const parseTime = (time) => {
  const [hour, minute] = time.split(':');
  return [parseInt(hour, 10), parseInt(minute, 10)];
};

const getDateFromClock = (date, time) => {
  const [hour, minute] = parseTime(time);
  const newDate = new Date(date);
  newDate.setHours(hour);
  newDate.setMinutes(minute);
  return newDate;
};

const isClosed = async (gym, date) => {
  const metadata = await db.gymGetMetadata(gym);
  const day = Constants.dayOfTheWeek[date.getDay()];
  const openDate = getDateFromClock(date, metadata.hours[day]['open']);
  const closeDate = getDateFromClock(date, metadata.hours[day]['close']);

  return openDate.getTime() > date.getTime() ||
  date.getTime() > closeDate.getTime();
};
// PUBLIC APIs
export const predictOccupancy = async (gym, date) => {
  if (await isClosed(gym, date)) {
    return 0;
  }
  const script = 'forecast/predict.py';
  const cmd = `python ${script} 
    --day_of_week ${date.getDay()} 
    --month ${date.getMonth()} 
    --hour ${date.getHours()} 
    --is_weekend ${isWeekend(date)} 
    --is_holiday ${isHoliday(date)} 
    --is_start_of_semester ${isStartOfSemester(date)} 
    --temperature ${getTemperature()}`;
    // different OS use different newline breaks
    // Remove newline breaks
  const command = cmd.replace(/(\r\n|\n|\r)/gm, '');
  try {
    const { stdout } = await execAsync(command);
    return parseInt(stdout, 10);
  } catch (error) {
    console.log(`Running Python Script error: ${error}`);
    return NaN;
  }
};

export const isValidReq = async (gym, date) => {
  if (isNaN(date)) {
    return 'Invalid Timestamp';
  }
  const names = await db.getAllGymNames();
  if (!names.includes(gym)) {
    return `Invalid Gym ${gym}`;
  }
  return '';
};
