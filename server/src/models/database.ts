import {
  GymHoursType,
  gymHoursModel,
  OccupancyRecordType,
  LogRecordType,
  logModel,
  OccupancyRecordModelType,
  MODEL_MAP,
} from "./database.types";
import DB from "./database.interface";
import { getRelativeDate } from "../utils/date";
import { GYM_NAMES, Collection } from "../utils/constants";
import { isIn } from "../utils/helper";

// Helper functions/constants
const getModel = (collection: Collection): OccupancyRecordModelType => {
  return MODEL_MAP[collection];
};

const defaultDateRange = {
  start: getRelativeDate(new Date(), 0),
  end: getRelativeDate(new Date(), 1),
};

const dummyRecord: OccupancyRecordType = {
  gym: "cohonFC",
  time: getRelativeDate(new Date(), 0),
  occupancy: 0,
};

// Database object
const db: DB = {
  insertOccupancyRecords: async (records, collection = Collection.Current) => {
    const model: OccupancyRecordModelType = getModel(collection);
    for (const record of records) {
      console.log("inserting into collection: ", collection);
      await model.create(record);
    }
  },

  getOccupancyRecords: async (options) => {
    const defaultOptions = {
      dateRange: defaultDateRange,
      collection: Collection.Current,
    };
    const { gym, dateRange, collection } = { ...defaultOptions, ...options };
    const { start, end } = dateRange;

    const model = getModel(collection);

    if (isIn(GYM_NAMES, gym)) {
      const records: OccupancyRecordType[] = await model
        .find({ gym: gym, time: { $gte: start, $lt: end } }, { _id: 0 })
        .sort({ time: -1 })
        .lean();
      return records;
    }

    const records: OccupancyRecordType[] = await model
      .find({ time: { $gte: start, $lt: end } }, { _id: 0 })
      .sort({ time: -1 })
      .lean();
    return records;
  },

  insertLogRecords: async (records) => {
    for (const record of records) {
      console.log("inserting into log collection");
      await logModel.create(record);
    }
  },

  getLogRecords: async (options) => {
    const defaultOptions = {
      dateRange: defaultDateRange,
    };
    const { gym, dateRange } = { ...defaultOptions, ...options };
    const { start, end } = dateRange;

    if (isIn(GYM_NAMES, gym)) {
      const records: LogRecordType[] = await logModel
        .find({ gym: gym, time: { $gte: start, $lt: end } }, { _id: 0 })
        .sort({ time: -1 })
        .lean();
      return records;
    }

    const records: LogRecordType[] = await logModel
      .find({ time: { $gte: start, $lt: end } }, { _id: 0 })
      .sort({ time: -1 })
      .lean();
    return records;
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
      const hours: GymHoursType[] = await gymHoursModel.find(
        { gym: gym, time: { $gte: startDate, $lt: endDate } },
        { _id: 0 }
      );
      return hours;
    }

    const hours: GymHoursType[] = await gymHoursModel.find(
      { time: { $gte: startDate, $lt: endDate } },
      { _id: 0 }
    );
    return hours;
  },
};

export default db;
