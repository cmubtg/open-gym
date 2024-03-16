import mongoose from 'mongoose';
import { OccupancyRecord, occupancyRecordSchema,
         GymHours, gymHoursSchema, GymName, DBOptionType } from './database.types';
import DB from './database.interface';
import { startOfDay, endOfDay, getRelativeDate } from '../utils/date';
import { GYM_NAMES, GYM_HOURS, TENSE, AGGREGATE_DATA_COLLECTION } from '../utils/constants';
import writeToCSV from '../utils/write_csv';

const conn = mongoose.connection;


const db : DB = {

  collectionExists: (collection) => {
    const collectionNames = conn.db.listCollections();
    return collectionNames.includes(collection);
  },

  insert: async (gym, data, tense=TENSE.PRESENT) => {
    const collection = getCollection(tense);
    await collection.create(data);
  },

  getRecords: async (gym: GymName, options = {
    start: startOfDay(new Date()),
    end: endOfDay(new Date()),
    tense: TENSE.PRESENT
  }) => {

    const { start, end, tense } = options;
    const collection = getCollection(tense);
    const records = await collection.find(
      { gym: gym, date: { $gte: start, $lt: end } },
      { _id: 0 }
    ).sort({time: -1});

    return records;
  },

  getRecentRecord: async (gym: GymName, options = {
    start: startOfDay(new Date()),
    end: endOfDay(new Date()),
    tense: TENSE.PRESENT
  }) => {

    const records = await db.getRecords(gym, options);
    return records.limit(1).next() ?? dummyRecord;
  },

  getAllRecordsByDate: async () => {
    const recordsArr = await Promise.all(
      GYM_NAMES.map((gym) => db.getRecords(gym as GymName))
    );
    const transformedRecords = recordsArr.map((records, index) => ({
      gym: GYM_NAMES[index],
      data: records,
    }));
    return transformedRecords;
  },

  deleteAllRecordsByDate: async (inputDate) => {
    await Promise.all(
      GYM_NAMES.map(async (gym) => {
        const collection = getCollection(gym);
        const date = getRelativeDate(inputDate, 0);
        const dayAfter = getRelativeDate(date, 1);
        await collection.deleteMany({
          time: { $gte: date, $lt: dayAfter },
        });
      })
    );
  },

  getGymHours: async (gym, startDate, endDate=(new Date(startDate))) => {
    startDate = startOfDay(startDate);
    endDate = endOfDay(endDate);
    const hoursCollection = getHoursCollection();
    const hours: GymHours[] = await hoursCollection.find(
      { gym: gym, date: { $gte: startDate, $lt: endDate } },
      { _id: 0, gym: 0 }
    );
    mongoose.deleteModel(GYM_HOURS);
    return hours;
  },

  moveAllRecords: async () => {
    const collectionNames = db.getGymCollections();
    await Promise.all(collectionNames.map(async (collectionName) => {
      const data = await db.getRecords(collectionName);
      const dataFormat = (doc: OccupancyRecord) => ({
        time: doc.time.toISOString(),
        occupancy: doc.occupancy,
      });
      writeToCSV(collectionName, data, dataFormat);
    }));
    await db.deleteAllRecords();
  },

  deleteAllRecords: async () => {
    // *** Insert deletion code HERE ***
  },

  insertAggregate: async (data) => {
    const collection = getAggregateCollection();
    await collection.create(data);
    mongoose.deleteModel(AGGREGATE_DATA_COLLECTION);
  }
};

export default db;

// PRIVATE HELPERS
const getAllCollections = async () => {
  return await conn.db.listCollections().toArray();
};

const getCollection = (collection) => {
  // Ensure collection exists
  if (!db.collectionExists(collection)) {
    throw new Error(`Collection (${collection}) does not exist`);
  }

  return mongoose.model<OccupancyRecord>(collection, occupancyRecordSchema, collection);
};

const getHoursCollection = () => {
  return mongoose.model<GymHours>(GYM_HOURS, gymHoursSchema, GYM_HOURS);
};

const getAggregateCollection = () => {
  return mongoose.model<AggregateData>(AGGREGATE_DATA_COLLECTION, aggregateDataSchema, AGGREGATE_DATA_COLLECTION);
};

const dummyRecord = {
  time: new Date(),
  occupancy: 0
};
