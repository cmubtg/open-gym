import * as db from '../models/database.mjs';
import util from 'util';
import { exec } from 'child_process';

const is_holiday = (date) => {
    return true;
}

const is_start_of_semester = (date) => {
    return false;
}

const get_temperature = () => {
    return 72.0;
}

const is_weekend = (date) => {
    return date.getDay() % 6 === 0;
}

const execAsync = util.promisify(exec);
const predictOccupancy = async (gym, date) => {
    const script = "forecast/predict.py";
    const cmd = `python ${script} 
    --day_of_week ${date.getDay()} 
    --month ${date.getMonth()} 
    --hour ${date.getHours()} 
    --is_weekend ${is_weekend(date)} 
    --is_holiday ${is_holiday(date)} 
    --is_start_of_semester ${is_start_of_semester(date)} 
    --temperature ${get_temperature()}`;
    // different OS use different newline breaks
    // Remove newline breaks
    const command = cmd.replace(/(\r\n|\n|\r)/gm,"");
    try {
        const { stdout, stderr} = await execAsync(command);
        return parseInt(stdout, 10);
    } catch(error) {
        console.log(`Running Python Script error: ${error}`)
        return NaN;
    }
}

const parseTime = (time) => {
    const {hour, minute} = time.split(":");
    return {hour: parseInt(hour, 10), minute: parseInt(minute, 10)};
}

const getDateFromClock = (date, time) => {
    const {hour, minute} = parseTime(time);
    const newDate = {...date};
    newDate.setHours(hour);
    newDate.setMinutes(minute);
    return newDate;
}

// TODO: Make isClosed function return close bool
const isClosed = async (db, gym, date) => {
    const daysOfTheWeekMap = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
    const metadata = await db.gymGetMetadata(gym);
    console.log(metadata);
    
    const day = daysOfTheWeekMap[date.getDay()];
    // const {open, close} = metadata[day];
    const openDate = getDateFromClock(date, metadata[day]["open"]);
    const closeDate = getDateFromClock(date, metadata[day]["close"]);
    return openDate.getTime() <= date.getTime() && date.getTime() <= closeDate();
}

export {isClosed, predictOccupancy};