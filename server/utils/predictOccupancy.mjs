import * as Constants from '../utils/constants.mjs';
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


const parseTime = (time) => {
    const [hour, minute] = time.split(":");
    return [parseInt(hour, 10), parseInt(minute, 10)];
}

const getDateFromClock = (date, time) => {
    const [hour, minute] = parseTime(time);
    const newDate = new Date(date);
    newDate.setHours(hour);
    newDate.setMinutes(minute);
    return newDate;
}

const isClosed = async (gym, date) => {
    const metadata = await db.gymGetMetadata(gym);
    const day = Constants.dayOfTheWeek[date.getDay()];
    const openDate = getDateFromClock(date, metadata.hours[day]["open"]);
    const closeDate = getDateFromClock(date, metadata.hours[day]["close"]);

    return openDate.getTime() > date.getTime() || date.getTime() > closeDate.getTime();
}
// PUBLIC APIs
export const predictOccupancy = async (gym, date) => {
    if (await isClosed(gym, date)) {
        return 0;
    }
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

export const is_valid_req = async (gym, date) => {
    if (isNaN(date)) {
        return 'Invalid Timestamp';
    } 
    const names = await db.getAllGymNames();
    if (!names.includes(gym)) {
        return `Invalid Gym ${gym}`;
    }
    return "";
}