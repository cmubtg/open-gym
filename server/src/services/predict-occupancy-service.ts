import util from "util";
import { exec } from "child_process";
import { GYM_NAMES, NO_ONE, GymName, isIn } from "@/utils";
import { isClosed } from "./gym-hours-service";

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

/**
 * Calls the python script compiled from the model to predict the occupancy
 * of a gym at a given date and time
 * @param gym the gym to predict the occupancy for
 * @param date the date and time to predict the occupancy for
 * @returns the predicted occupancy
 */
export const predictOccupancy = async (gym: string, date: Date) => {
  if (await isClosed(gym, date)) {
    return NO_ONE;
  }
  const script = "forecast/predict.py";
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
  const command = cmd.replace(/(\r\n|\n|\r)/gm, "");
  const { stdout } = await execAsync(command);
  return parseInt(stdout, 10);
};

/**
 * Validates the request to predict the occupancy of a gym
 * @param gym the gym to predict the occupancy for
 * @param timestamp the timestamp to predict the occupancy for
 */
export const validatePredictRequest = (gym: GymName, timestamp: string) => {
  if (isNaN(Date.parse(timestamp))) {
    throw new Error("Invalid Timestamp");
  }

  if (!isIn(GYM_NAMES, gym)) {
    throw new Error(`Invalid Gym ${gym}`);
  }
};
