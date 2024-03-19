import { CronJob } from 'cron';
import db from '../../models/database';
import { getRelativeDate } from '../../utils/date';
import { aggregateOccucpancyData, insertAllAggregate } from './aggregateDataUtils';

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
  const yesterday = getRelativeDate(new Date(), -1);
  const yesterdaysData = await db.getAllRecordsByDate(yesterday);
  const allAggregateData = aggregateOccucpancyData(yesterdaysData);
  await insertAllAggregate(yesterday, allAggregateData);
  await db.deleteAllRecordsByDate(yesterday);
};
