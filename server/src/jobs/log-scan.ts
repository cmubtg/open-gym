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
  const currentTime = timeRoundedToNearestMinute(new Date());
  const occupancyRecords: OccupancyRecordType[] = [];
  for (const gymName of GYM_NAMES) {
    const records = await db.getLogRecords({
      gym: gymName,
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
  console.log("Log scan complete:");
};
