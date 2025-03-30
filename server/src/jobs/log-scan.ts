import { CronJob } from "cron";
import db from "@/models/database";
import { OccupancyRecordType } from "@/models/types";
import {
  GYM_NAMES,
  OccupancyCollection,
  timeRoundedToNearestMinute,
  getESTDate,
  dateFromClock,
  logger,
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

  // Using the date time helpers to set start and end times in EST
  const today = getESTDate();
  const startTime = dateFromClock(today, "6:30");
  const endTime = new Date(today);
  endTime.setHours(23, 59, 59, 999);

  // Only run the job if the current time is after 6:30 EST
  const currentEST = getESTDate();
  if (currentEST < startTime) {
    logger.info(`Current time is before 6:30 AM EST. Skipping log scan.`);
    return;
  }

  for (const gymName of GYM_NAMES) {
    const records = await db.getLogRecords({
      gym: gymName,
      dateRange: {
        start: startTime,
        end: endTime,
      },
    });

    const occupancy = records.reduce(
      (acc, record) => acc + (record.entries - record.exits),
      0
    );
    if (occupancy < 0) {
      logger.error(
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
  logger.info(`Log scan complete ${currentTime}`);
  for (const record of occupancyRecords) {
    logger.info(
      `Inserted occupancy record for ${record.gym} at ${record.time} with occupancy ${record.occupancy}`
    );
  }
};
