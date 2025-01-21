import { CronJob } from "cron";
import db from "../../models/database";
import { GYM_NAMES, Collection } from "../../utils/constants";
import { getRelativeDate } from "../../utils/date";
import { aggregateOccupancyData } from "./aggregateDataUtils";
import { GymName, OccupancyRecordType } from "../../models/database.types";

/**
 * Initialize aggregate scheduler
 */
export default function initAggregateScheduler() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  new CronJob(
    "0 0 * * *", // Daily (@ 12:00 am)
    aggregateOccupancyJob,
    null, // onComplete
    true, // start
    "America/New_York" // timeZone
  );
}

/**
 * Pops and aggregates yesterday's data
 * and inserts new data into aggregate collection
 */
const aggregateOccupancyJob = async () => {
  const currentDate = new Date();
  const yesterday = getRelativeDate(currentDate, -1);
  for (const gymName of GYM_NAMES) {
    const yesterdaysData: OccupancyRecordType[] = await db.getOccupancyRecords({
      gym: gymName as GymName,
      dateRange: {
        start: yesterday,
        end: getRelativeDate(currentDate, 0),
      },
      collection: Collection.Current,
    });
    const data: OccupancyRecordType[] = aggregateOccupancyData(yesterday, {
      gym: gymName,
      data: yesterdaysData,
    });
    await db.insertOccupancyRecords(data, Collection.Aggregate);
  }
};
