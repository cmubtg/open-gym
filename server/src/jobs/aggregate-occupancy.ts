import { CronJob } from "cron";
import db from "../models/database";
import { OccupancyRecordType } from "../models/types";
import {
  GYM_NAMES, 
  OccupancyCollection,
  GymName,
  nthHour,
  relativeDate
} from "../utils";

/**
 * Initialize aggregate occupancy scheduler
 */
export default function StartAggregateOccupancyScheduler() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  new CronJob(
    "0 0 * * *", // Daily (@ 12:00 am)
    aggregateOccupancyJob,
    null, // onComplete
    true, // start
    "UTC" // timeZone
  );
}

/**
 * Pops and aggregates yesterday"s data
 * and inserts new data into aggregate collection
 */
const aggregateOccupancyJob = async () => {
  const currentDate = new Date();
  const yesterday = relativeDate(currentDate, -1);
  for (const gymName of GYM_NAMES) {
    const yesterdaysData: OccupancyRecordType[] = await db.getOccupancyRecords({
      gym: gymName as GymName,
      dateRange: {
        start: yesterday,
        end: relativeDate(currentDate, 0),
      },
      collection: OccupancyCollection.Current,
    });
    const data: OccupancyRecordType[] = aggregateOccupancyData(yesterday, {
      gym: gymName,
      data: yesterdaysData,
    });
    await db.insertOccupancyRecords(data, OccupancyCollection.Aggregate);
  }
};

/**
 * Groups occupancy records by hour
 *
 * @param data array of occupancy records
 * @returns array of occupancy records grouped by hour
 * (A[i] = OccupancyRecordType[] from i:00-i+1:00)
 */
const groupGymDataByHours = (data: OccupancyRecordType[]) => {
  const occupancyAtEachHour = Array.from<null, number[]>(
    { length: 24 },
    () => []
  );

  return data.reduce((group, record) => {
    const { time, occupancy } = record;
    const hour = time.getHours();
    const prevData: number[] = group[hour];
    prevData.push(occupancy);
    group[hour] = prevData;
    return group;
  }, occupancyAtEachHour);
};

/**
 * Aggregates daily occupancy data for all gyms by the hour
 *
 * @param dailyData  occupancy data
 * @returns aggregated data by the hour
 */
const aggregateOccupancyData = (
  date: Date,
  { gym, data }: { gym: GymName, data: OccupancyRecordType[] }
) => {
  const groupedByHour = groupGymDataByHours(data);

  // Get average occupancy of for each hour
  const averagedByHour = groupedByHour.map((occupancies) =>
    occupancies.length === 0
      ? 0
      : occupancies.reduce((total, occ) => total + occ, 0) / occupancies.length
  );

  return averagedByHour.map((occupancy, index) => ({
    gym: gym as GymName,
    time: nthHour(date, index),
    occupancy,
  }));
};