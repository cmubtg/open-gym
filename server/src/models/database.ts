import mongoose from 'mongoose';
import { OccupancyRecord, occupancyRecordSchema,
         AggregateData, aggregateDataSchema,
         GymHours, gymHoursSchema, GymName } from './database.types';
import DB from './database.interface';
import { dateInFuture, startOfDay, endOfDay, getRelativeDate } from '../utils/date';
import { GYM_HOURS, AGGREGATE_DATA_COLLECTION } from '../utils/constants';
import writeToCSV from '../utils/write_csv';

const conn = mongoose.connection;

const db : DB = {

  collectionExists: (collection) => {
    const gymNames = db.getGymCollections();
    return gymNames.includes(collection);
  },

  insert: async (gym, data) => {
    const collection = getCollection(gym);
    await collection.create(data);
    mongoose.deleteModel(gym);
  },

  getGymCollections: () => {
    return ['tepperFC', 'fairfax', 'cohonFC', 'wiegand'];
  },

  getAllRecords: async () => {
    const gyms = db.getGymCollections();
    const recordsArr = await Promise.all(gyms.map((gym) => db.getRecords(gym)));
    const transformedRecords = recordsArr.map((records, index) => ({
      gym: gyms[index],
      data: records,
    }));
    return transformedRecords;
  },

  getAllRecordsByDate: async (date: Date) => {
    const gyms = db.getGymCollections();
    const recordsArr = await Promise.all(
      gyms.map((gym) => db.getRecordsByDate(gym, date))
    );
    const transformedRecords = recordsArr.map((records, index) => ({
      gym: gyms[index],
      data: records,
    }));
    return transformedRecords;
  },

  getRecords: async (gym) => {
    const collection = getCollection(gym);
    const records = await collection.find({});
    mongoose.deleteModel(gym);
    return records;
  },

  getRecordsByDate: async (gym, inputDate) => {
    const collection = getCollection(gym);

    const date = getRelativeDate(inputDate, 0);
    const dayAfter = getRelativeDate(date, 1);

    const records = await collection.find({
      time: { $gte: date, $lt: dayAfter },
    });

    return records;
  },

  deleteAllRecordsByDate: async (inputDate) => {
    const gyms = db.getGymCollections();
    await Promise.all(
      gyms.map(async (gym) => {
        const collection = getCollection(gym);
        const date = getRelativeDate(inputDate, 0);
        const dayAfter = getRelativeDate(date, 1);
        await collection.deleteMany({
          time: { $gte: date, $lt: dayAfter },
        });
      })
    );
  },

  getRecentRecord: async (gym) => {
    const collection = getCollection(gym);
    const record = await collection.findOne().sort({ time: -1 }) ?? dummyRecord;
    mongoose.deleteModel(gym);
    return record;
  },

  getGymById: async (gym, id) => {
    const collection = getCollection(gym);
    const record: OccupancyRecord = await collection.findById(id) ?? dummyRecord;
    mongoose.deleteModel(gym);
    return record;
  },

  getGymHours: async (gym, date) => {
    const startDate = startOfDay(date);
    const endDate = endOfDay(date);
    const hoursCollection = getHoursCollection();
    const hours: GymHours[] = await hoursCollection.find(
      { gym: gym, date: { $gte: startDate, $lt: endDate } },
      { _id: 0, gym: 0 }
    );
    mongoose.deleteModel(GYM_HOURS);
    return hours;
  },

  getNextWeekGymHours: async (gym, date) => {
    const startDate = startOfDay(date);
    const endDate = endOfDay(dateInFuture(date, 6));
    const hoursCollection = getHoursCollection();
    const hours: GymHours[] = await hoursCollection.find(
      { gym: gym, date: { $gte: startDate, $lte: endDate } },
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

const getCollection = (collection: GymName) => {
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
