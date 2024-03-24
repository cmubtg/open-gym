import { CronJob } from 'cron';
import db from '../../models/database';
import { GYM_NAMES, TENSE } from '../../utils/constants';
import { endOfDay, getRelativeDate } from '../../utils/date';
import { aggregateOccupancyData } from './aggregateDataUtils';
import { GymName } from '../../models/database.types';

/**
 * Initialize aggregate scheduler
 */
export default function initAggregateScheduler() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  new CronJob(
    '0 0 * * *', // Daily (@ 12:00 am)
    aggregateOccupancyJob,
    null, // onComplete
    true, // start
    'America/New_York' // timeZone
  );
}

/**
 * Pops and aggregates yesterday's data
 * and inserts new data into aggregate collection
 */
const aggregateOccupancyJob = async () => {
  const currentDate = new Date();
  const yesterday = getRelativeDate(new Date(), -1);
  for (const gymName of GYM_NAMES) {
    const yesterdaysData = await db.getRecords({
      gym: gymName as GymName,
      dateRange: {
        start: getRelativeDate(currentDate, -1),
        end: getRelativeDate(currentDate, 0)
      },
      tense: TENSE.PRESENT,
    });
    const data = aggregateOccupancyData(yesterday, { gym: gymName, data: yesterdaysData });
    await db.insertMany(data, TENSE.PAST);
  }

  await db.deleteRecords({
    dateRange: {
      start: yesterday,
      end: endOfDay(yesterday)
    },
    tense: TENSE.PRESENT,
  });
};
