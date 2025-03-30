import DB from "./database-interface";
import {
  GymHoursType,
  gymHoursModel,
  OccupancyRecordType,
  LogRecordType,
  logModel,
  OccupancyRecordModelType,
  OCCUPANCY_MODEL_MAP,
} from "./types";
import { GYM_NAMES, OccupancyCollection, isIn, relativeDate } from "@/utils";

// Helper functions/constants
const getOccupancyModel = (
  collection: OccupancyCollection
): OccupancyRecordModelType => {
  return OCCUPANCY_MODEL_MAP[collection];
};

// Database object
const db: DB = {
  insertOccupancyRecords: async (
    records,
    collection = OccupancyCollection.Current
  ) => {
    const model: OccupancyRecordModelType = getOccupancyModel(collection);
    for (const record of records) {
      await model.create(record);
    }
  },

  getOccupancyRecords: async (options) => {
    const defaultOptions = {
      dateRange: {
        start: relativeDate(new Date(), 0),
        end: relativeDate(new Date(), 1),
      },
      collection: OccupancyCollection.Current,
    };
    const { gym, dateRange, collection } = { ...defaultOptions, ...options };
    const { start, end } = dateRange;

    const model = getOccupancyModel(collection);

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
      await logModel.create(record);
    }
  },

  getLogRecords: async (options) => {
    const defaultOptions = {
      dateRange: {
        start: relativeDate(new Date(), 0),
        end: relativeDate(new Date(), 1),
      },
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
      dateRange: {
        start: relativeDate(new Date(), 0),
        end: relativeDate(new Date(), 1),
      },
    };
    const { gym, dateRange } = { ...defaultOptions, ...options };
    const { start, end } = dateRange;

    const startDate = relativeDate(start, 0);
    const endDate = relativeDate(end, 1);
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
