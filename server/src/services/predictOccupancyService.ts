import { exec } from 'child_process';
import util from 'util';
import { GymName } from '../models/database.types';
import { isClosed } from './gymHoursService';
import { GYM_NAMES, NO_ONE } from '../utils/constants';
import { isIn } from '../utils/helper';

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
  return date.getDay() % 6 === 0;
};

const execAsync = util.promisify(exec);

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

export const validatePredictReq = (gym: GymName, timestamp: string) => {
  if (isNaN(Date.parse(timestamp))) {
    throw new Error('Invalid Timestamp');
  }

  if (!isIn(GYM_NAMES, gym)) {
    throw new Error(`Invalid Gym ${gym}`);
  }
};