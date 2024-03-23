import { CronJob } from 'cron';
import db from '../../models/database';
import { GYM_NAMES, TENSE } from '../../utils/constants';
import { endOfDay, getRelativeDate } from '../../utils/date';
import { aggregateOccucpancyData, insertAllAggregate } from './aggregateDataUtils';
import { GymName, GymOccupancyRecord } from '../../models/database.types';

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
  for (const gymName of GYM_NAMES) {
    const yesterdaysData = await db.getRecords(gymName as GymName, {
      start: yesterday,
      end: endOfDay(yesterday),
      tense: TENSE.PRESENT,
    });
    await db.insertMany(yesterdaysData, TENSE.PAST);
  }
  
  await db.deleteRecords("",{
    start: yesterday,
    end: endOfDay(yesterday),
    tense: TENSE.PRESENT,
  });
};
