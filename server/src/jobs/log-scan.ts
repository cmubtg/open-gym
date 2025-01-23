import { CronJob } from "cron";
import db from '../models/database';
import { GYM_NAMES, Collection } from "../utils/constants";
import { GymName, OccupancyRecordType } from "../models/database.types";
import { timeRoundedToNearestMinute } from "../utils/date";

/**
 * Initialize log scanner
 */
export default function initLogScanScheduler() {
  new CronJob(
    '*/5 * * * *', // Every 5 minutes
    logScanJob,
    null, // onComplete
    true, // start
    'America/New_York' // timeZone
  );
}

/**
 * Retrieves the most current log record from each gym,
 * calculates occupancy and inserts record into Current
 * collection at time rounded to nearest minute.
 */
export const logScanJob = async () => {
  const currentTime = timeRoundedToNearestMinute(new Date());
  const occupancyRecords: OccupancyRecordType[] = [];
  for (const gymName of GYM_NAMES) {
    const record = await db.getMostRecentLogRecord({
      gym: gymName as GymName,
    });

    let occupancy = record.entries - record.exits;
    occupancyRecords.push({
      gym: gymName,
      time: currentTime,
      occupancy: occupancy,
    });
  }
  await db.insertOccupancyRecords(occupancyRecords, Collection.Current);
};