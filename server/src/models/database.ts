import mongoose from 'mongoose';
import { GymHours, OccupancyRecord, gymHoursSchema, occupancyRecordSchema } from './database.types';
import DB from './database.interface';
import { dateInFuture, startOfDay, endOfDay } from '../utils/date';
import { METADATA, GYM_HOURS } from '../utils/constants';
import writeToCSV from '../utils/write_csv';

const conn = mongoose.connection;

const db : DB = {

  collectionExists: async (collection: string) => {
    const gymNames = await db.getAllNames();
    return gymNames.includes(collection);
  },

  insert: async (gym, data) => {
    const collection = await getCollection(gym);
    await collection.create(data);
    mongoose.deleteModel(gym);
  },

  getAllNames: async () => {
    const collections = await getAllCollections();
    const collectionNames: string[] = collections.map((collection) => collection.name);
    return collectionNames.filter((name) => name !== METADATA);
  },

  getAllRecords: async () => {
    const gyms = await db.getAllNames();
    const recordsArr = await Promise.all(gyms.map((gym) => db.getRecords(gym)));
    const transformedRecords = recordsArr.map((records, index) => ({
      gym: gyms[index],
      data: records,
    }));
    return transformedRecords;
  },

  getRecords: async (gym) => {
    const collection = await getCollection(gym);
    const records = await collection.find({});
    mongoose.deleteModel(gym);
    return records;
  },

  getRecentRecord: async (gym) => {
    const collection = await getCollection(gym);
    const record = await collection.findOne().sort({ time: -1 }) ?? dummyRecord;
    mongoose.deleteModel(gym);
    return record;
  },

  getGymById: async (gym: string, id: string) => {
    const collection = await getCollection(gym);
    const record: OccupancyRecord = await collection.findById(id) ?? dummyRecord;
    mongoose.deleteModel(gym);
    return record;
  },

  getGymHours: async (gym: string, date: Date) => {
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

  getNextWeekGymHours: async (gym: string, date: Date) => {
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
    const collectionNames: string[] = await db.getAllNames();
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

};

export default db;

// PRIVATE HELPERS
const getAllCollections = async () => {
  return await conn.db.listCollections().toArray();
};

const getCollection = async (collection: string) => {
  // Ensure collection exists
  if (!await db.collectionExists(collection)) {
    throw new Error(`Collection (${collection}) does not exist`);
  }
  return mongoose.model<OccupancyRecord>(collection, occupancyRecordSchema, collection);
};

const getHoursCollection = () => {
  return mongoose.model<GymHours>(GYM_HOURS, gymHoursSchema, GYM_HOURS);
};

const dummyRecord = {
  time: new Date(),
  occupancy: 0
};
