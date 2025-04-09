import { CronJob } from "cron";
import db from "@/models/database";
import { OccupancyRecordType, LogRecordType } from "@/models/types";
import {
  GYM_NAMES,
  OccupancyCollection,
  GymName,
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
 * Checks if the current time is after the evening threshold (8:00 PM)
 * @param currentTime The current time in EST
 * @returns True if it's after 8:00 PM
 */
function isEveningHours(currentTime: Date): boolean {
  const today = getESTDate();
  const eveningThreshold = dateFromClock(today, "20:00"); // 8:00 PM
  return currentTime >= eveningThreshold;
}

/**
 * Processes records for a gym to calculate occupancy with adjustments as needed
 * @param records The log records for a gym
 * @param gymName The name of the gym
 * @param currentDateTime The current time
 * @returns An occupancy record object and stats for logging
 */
function processGymRecords(
  records: LogRecordType[],
  gymName: GymName,
  currentDateTime: Date
): {
  record: OccupancyRecordType;
  stats: {
    totalEntries: number;
    totalExits: number;
    adjustedExits: number;
    occupancy: number;
    adjustmentApplied: boolean;
    exitWeightFactor: number;
  };
} {
  // Configuration constants
  const BUSY_THRESHOLD = 2000;
  const EXIT_WEIGHT_FACTOR = 0.94;

  // Calculate total entries and exits
  let totalEntries = 0;
  let totalExits = 0;
  for (const record of records) {
    totalEntries += record.entries;
    totalExits += record.exits;
  }

  // Determine if adjustment should be applied
  const isEvening = isEveningHours(currentDateTime);
  const isBusy = totalEntries + totalExits > BUSY_THRESHOLD;
  const shouldAdjust = isEvening && isBusy;

  // Calculate occupancy
  const adjustedExits = shouldAdjust
    ? Math.floor(totalExits * EXIT_WEIGHT_FACTOR)
    : totalExits;
  const occupancy = totalEntries - adjustedExits;

  return {
    record: {
      gym: gymName,
      time: currentDateTime,
      occupancy: occupancy,
    },
    stats: {
      totalEntries,
      totalExits,
      adjustedExits,
      occupancy,
      adjustmentApplied: shouldAdjust,
      exitWeightFactor: EXIT_WEIGHT_FACTOR,
    },
  };
}

/**
 * Main job function that scans logs and calculates occupancy
 */
export const logScanJob = async () => {
  // Set up time boundaries
  const currentDateTime = getESTDate();
  const startTime = dateFromClock(currentDateTime, "6:30");
  const endTime = dateFromClock(currentDateTime, "23:59");

  // Check if we should run the job
  if (currentDateTime < startTime || currentDateTime > endTime) {
    logger.info("Log scan job skipped - outside of scheduled hours");
    return;
  }

  // Process each gym
  const occupancyRecords: OccupancyRecordType[] = [];
  const roundedCurrentTime = timeRoundedToNearestMinute(currentDateTime);

  for (const gymName of GYM_NAMES) {
    // Fetch records for this gym
    const records = await db.getLogRecords({
      gym: gymName,
      dateRange: {
        start: startTime,
        end: endTime,
      },
    });

    const { record, stats } = processGymRecords(
      records,
      gymName,
      roundedCurrentTime
    );

    if (stats.occupancy < 0) {
      logger.warn(
        `Negative occupancy (${stats.occupancy}) calculated for ${gymName} at ${roundedCurrentTime} - ` +
          `Entries: ${stats.totalEntries}, Exits: ${stats.totalExits}, Adjusted Exits: ${stats.adjustedExits}. ` +
          `Setting to 0.`
      );
    }

    if (stats.adjustmentApplied) {
      logger.info(
        `Applied busy evening adjustment (${stats.exitWeightFactor}x) to exits for ${gymName}. ` +
          `Total entries: ${stats.totalEntries}, Total exits: ${stats.totalExits}, ` +
          `Adjusted exits: ${stats.adjustedExits}, occupancy: ${stats.occupancy}, `
      );
    }

    occupancyRecords.push(record);
  }

  // Save records to database
  await db.insertOccupancyRecords(
    occupancyRecords,
    OccupancyCollection.Current
  );

  // Log completion
  logger.info(`Log scan complete`);
  for (const record of occupancyRecords) {
    logger.info(
      `Inserted occupancy record for ${record.gym} at ${record.time} with occupancy ${record.occupancy}`
    );
  }
};
