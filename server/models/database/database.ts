import mongoose from 'mongoose';
import { METADATA } from '../../utils/constants';
import { OccupancyRecord, Metadata, occupancyRecordSchema, metaDataSchema } from './database.types';
import DB from './database.interface';
import writeToCSV from '../../utils/write_csv';

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

  getAllRecords : async () => {
    const gyms = await db.getAllNames();
    const recordsArr = await Promise.all(gyms.map((gym) => db.getRecords(gym)));
    const transformedRecords = recordsArr.map((records, index) => ({
      gym: gyms[index],
      data: records,
    }));
    return transformedRecords;
  },

  getAllMetadata: async () => {
    const collection = getMetaDataCollection();
    const metadata: Metadata[] = await collection.find({});
    mongoose.deleteModel(METADATA);
    return metadata;
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

  getMetadata: async (gym: string) => {
    const collection = getMetaDataCollection();
    const metadata: Metadata[] = await collection.find({ collectionName: gym });
    mongoose.deleteModel(METADATA);
    return metadata[0];
  },

  getGymById: async (gym: string, id: string) => {
    const collection = await getCollection(gym);
    const record: OccupancyRecord = await collection.findById(id) ?? dummyRecord;
    mongoose.deleteModel(gym);
    return record;
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

const getMetaDataCollection = () => {
  return mongoose.model<Metadata>(METADATA, metaDataSchema, METADATA);
}

const dummyRecord = { 
  time: new Date(0), 
  occupancy: 0 
};
