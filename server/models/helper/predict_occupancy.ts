import db from '../database/database';
import { DAYS_OF_THE_WEEK, NO_ONE } from '../../utils/constants';
import { exec } from 'child_process';
import util from 'util';

const isHoliday = (date: Date) => {
  return true;
};

const isStartOfSemester = (date: Date) => {
  return false;
};

const getTemperature = () => {
  return 72.0;
};

const isWeekend = (date: Date) => {
  return date.getDay() % 6 === 0; // eslint-disable-line @typescript-eslint/no-magic-numbers
};

const execAsync = util.promisify(exec);

const parseTime = (time: string): [number, number] => {
  const [hour, minute] = time.split(':');
  return [parseInt(hour, 10), parseInt(minute, 10)];
};

const getDateFromClock = (date: Date, time: string) => {
  const [hour, minute] = parseTime(time);
  const newDate = new Date(date);
  newDate.setHours(hour);
  newDate.setMinutes(minute);
  return newDate;
};

const isClosed = async (gym: string, date: Date) => {
  const metadata = await db.getMetadata(gym);
  const day = DAYS_OF_THE_WEEK[date.getDay()] as keyof typeof metadata.hours;
  const openDate = getDateFromClock(date, metadata.hours[day].open);
  const closeDate = getDateFromClock(date, metadata.hours[day].close);

  return openDate.getTime() > date.getTime() ||
          date.getTime() > closeDate.getTime();
};
// PUBLIC APIs
export const predictOccupancy = async (gym: string, date: Date) => {
  if (await isClosed(gym, date)) {
    return NO_ONE;
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
  const { stdout } = await execAsync(command);
  return parseInt(stdout, 10);
};

export const validatePredictReq = async (gym: string, timestamp: string) => {
  if (isNaN(Date.parse(timestamp))) {
    throw new Error('Invalid Timestamp');
  }
  const names = await db.getAllNames();
  if (!names.includes(gym)) {
    throw new Error(`Invalid Gym ${gym}`);
  }
};
