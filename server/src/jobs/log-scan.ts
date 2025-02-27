import { CronJob } from "cron";
import db from "@/models/database";
import { OccupancyRecordType } from "@/models/types";
import {
  GYM_NAMES,
  OccupancyCollection,
  timeRoundedToNearestMinute,
} from "@/utils";

/**
 * Initialize log scanner
 */
export default function StartLogScanScheduler() {
  new CronJob(
    "*/5 * * * *", // Every 5 minutes
    logScanJob,
    null, // onComplete
    true, // start
    "UTC" // timeZone
  );
}

/**
 * Retrieves the most current log record from each gym,
 * calculates occupancy and inserts record into Current
 * collection at time rounded to nearest minute.
 */
export const logScanJob = async () => {
  let currentTime = timeRoundedToNearestMinute(new Date());
  const occupancyRecords: OccupancyRecordType[] = [];

  // Ignore all log records before 6:30am
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startTime = new Date(today);
  startTime.setHours(6, 30, 0, 0);

  const endTime = new Date(today);
  endTime.setHours(23, 59, 59, 999);

  for (const gymName of GYM_NAMES) {
    const records = await db.getLogRecords({
      gym: gymName,
      dateRange: {
        start: startTime,
        end: endTime,
      }
    });

    const occupancy = records.reduce(
        (acc, record) => acc + (record.entries - record.exits),
        0
    );
    if (occupancy < 0) {
      console.log(
          `Negative occupancy (${occupancy}) recorded for ${gymName} at ${currentTime}`,
          records
      );
      continue;
    }
    occupancyRecords.push({
      gym: gymName,
      time: currentTime,
      occupancy: occupancy,
    });
  }
  await db.insertOccupancyRecords(
      occupancyRecords,
      OccupancyCollection.Current
  );
  currentTime = timeRoundedToNearestMinute(new Date());
  console.log(`Log scan complete ${currentTime}`);
  for (const record of occupancyRecords) {
    console.log(
        `Inserted occupancy record for ${record.gym} at ${record.time} with occupancy ${record.occupancy}`
    );
  }
};