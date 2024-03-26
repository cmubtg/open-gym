import { GymHours, GymHoursModel, GymName, ModelMap, OccupancyRecord } from './database.types';
import DB from './database.interface';
import { getRelativeDate } from '../utils/date';
import { GYM_NAMES, TENSE } from '../utils/constants';
import { isIn } from '../utils/helper';

const db : DB = {

  insertOne: async (record, tense=TENSE.PRESENT) => {
    await db.insertMany([record], tense);
  },

  insertMany: async (records, tense=TENSE.PRESENT) => {
    const collection = getCollection(tense);
    for (const record of records) {
      await collection.create(record);
    }
  },

  getRecords: async (options) => {
    const defaultOptions = {
      dateRange: defaultDateRange,
      tense: TENSE.PRESENT,
    };
    const { gym, dateRange, tense } = { ...defaultOptions, ...options };
    const { start, end } = dateRange;

    const collection = getCollection(tense);
    if (isIn(GYM_NAMES, gym)) {
      const records: OccupancyRecord[] = await collection.find(
        { gym: gym, date: { $gte: start, $lt: end } },
        { _id: 0 }
      ).sort({ time: -1 }).lean();
      return records;
    }

    const records: OccupancyRecord[] = await collection.find(
      { date: { $gte: start, $lt: end } },
      { _id: 0 }
    ).sort({ time: -1 }).lean();
    return records;
  },

  getRecentRecords: async (options) => {
    const defaultOptions = {
      dateRange: defaultDateRange,
      tense: TENSE.PRESENT,
    };
    const { gym, dateRange, tense } = { ...defaultOptions, ...options };

    const recordsData = [];
    if (isIn(GYM_NAMES, gym)) {
      const records: OccupancyRecord[] = await db.getRecords({
        gym: gym,
        dateRange: dateRange,
        tense: tense
      });
      if (records.length > 0) {
        return [records[0]];
      }
      return [dummyRecord];
    }

    for (const gym of GYM_NAMES) {
      const records: OccupancyRecord[] = await db.getRecords({
        gym: gym as GymName,
        dateRange: dateRange,
        tense: tense
      });
      if (records.length > 0) {
        recordsData.push(records[0]);
      }
    }
    return recordsData;
  },

  deleteRecords: async (options) => {
    const defaultOptions = {
      gym: "",
      dateRange: defaultDateRange,
      tense: TENSE.PRESENT,
    };
    const { gym, dateRange, tense } = { ...defaultOptions, ...options };
    const { start, end } = dateRange;

    const collection = getCollection(tense);
    if (isIn(GYM_NAMES, gym)) {
      await collection.deleteMany({
        gym: gym,
        time: { $gte: start, $lt: end },
      });
      return;
    }

    await collection.deleteMany({
      time: { $gte: start, $lt: end },
    });
    return;
  },

  getGymHours: async (options) => {
    const defaultOptions = {
      dateRange: defaultDateRange,
    };
    const { gym, dateRange } = { ...defaultOptions, ...options };
    const { start, end } = dateRange;

    const startDate = getRelativeDate(start, 0);
    const endDate = getRelativeDate(end, 1);
    if (isIn(GYM_NAMES, gym)) {
      const hours: GymHours[] = await GymHoursModel.find(
        { gym: gym, date: { $gte: startDate, $lt: endDate } },
        { _id: 0 }
      );
      return hours;
    }

    const hours: GymHours[] = await GymHoursModel.find(
      { date: { $gte: startDate, $lt: endDate } },
      { _id: 0 }
    );
    return hours;
  },

};

export default db;

const getCollection = (collection: TENSE) => {
  return ModelMap[collection];
};

const defaultDateRange = { start: getRelativeDate(new Date(), 0), end: getRelativeDate(new Date(), 1) };

const dummyRecord: OccupancyRecord = {
  gym: "cohonFC",
  time: getRelativeDate(new Date(), 0),
  occupancy: 0
};
