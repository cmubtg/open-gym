import {
  GymHours,
  GymHoursModel,
  GymName,
  Model,
  MODEL_MAP,
  OccupancyRecord,
} from "./database.types";
import DB from "./database.interface";
import { getRelativeDate } from "../utils/date";
import { GYM_NAMES, Collection } from "../utils/constants";
import { isIn } from "../utils/helper";

// Helper functions/constants
const getModel = (collection: Collection): Model => {
  return MODEL_MAP[collection];
};

const defaultDateRange = {
  start: getRelativeDate(new Date(), 0),
  end: getRelativeDate(new Date(), 1),
};

const dummyRecord: OccupancyRecord = {
  gym: "cohonFC",
  time: getRelativeDate(new Date(), 0),
  occupancy: 0,
};

// Database object
const db: DB = {
  insertOne: async (record, collection = Collection.Current) => {
    const model: Model = getModel(collection);
    console.log("inserting into collection: ", collection);
    await model.create(record);
  },

  insertMany: async (records, collection = Collection.Current) => {
    for (const record of records) {
      await db.insertOne(record, collection);
    }
  },

  getRecords: async (options) => {
    const defaultOptions = {
      dateRange: defaultDateRange,
      collection: Collection.Current,
    };
    const { gym, dateRange, collection } = { ...defaultOptions, ...options };
    const { start, end } = dateRange;

    const model = getModel(collection);

    if (isIn(GYM_NAMES, gym)) {
      const records: OccupancyRecord[] = await model
        .find({ gym: gym, date: { $gte: start, $lt: end } }, { _id: 0 })
        .sort({ time: -1 })
        .lean();
      return records;
    }

    const records: OccupancyRecord[] = await model
      .find({ date: { $gte: start, $lt: end } }, { _id: 0 })
      .sort({ time: -1 })
      .lean();
    return records;
  },

  getRecentRecords: async (options) => {
    const defaultOptions = {
      dateRange: defaultDateRange,
      collection: Collection.Current,
    };
    const { gym, dateRange, collection } = { ...defaultOptions, ...options };

    const recordsData = [];
    if (isIn(GYM_NAMES, gym)) {
      const records: OccupancyRecord[] = await db.getRecords({
        gym: gym,
        dateRange: dateRange,
        collection: collection,
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
        collection: collection,
      });
      if (records.length > 0) {
        recordsData.push(records[0]);
      }
    }
    return recordsData;
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
