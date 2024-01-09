import mongoose from 'mongoose';
import { METADATA } from '../../utils/constants';
import { Record, Metadata, recordSchema, metaDataSchema } from './database.types';
import writeToCSV from '../../utils/write_csv';

const conn = mongoose.connection;

const getAllCollections = async () => {
  return await conn.db.listCollections().toArray();
};

// Check if a collection exists
const collectionExists = async (collection: string) => {
  const collections = await getAllCollections();
  return collections.some((c) => c.name === collection);
};

// PUBLIC FUNCTIONS

export const getAllGymNames = async () => {
  const collections = await getAllCollections();
  const collectionNames = collections.map((collection) => collection.name);
  return collectionNames.filter((name) => name !== METADATA);
};

const getCollection = async (collection: string) => {
  // Ensure collection exists
  const gymNames = await getAllGymNames()
  if (!gymNames.includes(collection)) {
    throw new Error(`Collection (${collection}) does not exist`);
  }

  return mongoose.model<Record>(collection, recordSchema, collection);
};

const getMetaDataCollection = async () => {
  return mongoose.model<Metadata>(METADATA, metaDataSchema, METADATA);
}

// Insert into a collection
export const gymInsert = async (gym: string, data: Record) => {
  const collection = await getCollection(gym);
  collection.create(data);
  mongoose.deleteModel(gym);
};

// Get most recent record from a collection (gym)
export const gymGetRecentRecord = async (gym: string) => {
  const collection = await getCollection(gym);
  const record: Record | {} = await collection.findOne().sort({ time: -1 }) || {};
  mongoose.deleteModel(gym);
  return record;
};

// gymFindById from a collection
export const gymFindById = async (gym: string, id: string) => {
  const collection = await getCollection(gym);
  const record: Record | {} = await collection.findById(id) || {};
  mongoose.deleteModel(gym);
  return record;
};

// Get all Records from a collection
export const gymGetAllRecords = async (gym: string) => {
  const collection = await getCollection(gym);
  const records: Record[] = await collection.find({});
  mongoose.deleteModel(gym);
  return records;
};

// Get all metadata
export const gymGetAllMetadata = async () => {
  const collection = await getMetaDataCollection();
  const metadata: Metadata[] = await collection.find({});
  mongoose.deleteModel(METADATA);
  return metadata;
};

// Get gym metadata
export const gymGetMetadata = async (gym: string) => {
  const collection = await getMetaDataCollection();
  const metadata: Metadata[] = await collection.find({ collection_name: gym });
  mongoose.deleteModel(METADATA);
  return metadata[0];
};

// Delete from a collection
export const gymDeleteAllRecords = () => {
  // *** Insert deletion code HERE ***
};

// Move all data from a collection
export const gymMoveAllRecords = async () => {
  const collectionNames: string[] = await getAllGymNames();
  await Promise.all(collectionNames.map(async (collectionName) => {
    const data = await gymGetAllRecords(collectionName);
    const dataFormat = (doc: Record) => ({
      time: doc.time.toISOString(),
      occupancy: doc.occupancy,
    });
    writeToCSV(collectionName, data, dataFormat);
  }));
  gymDeleteAllRecords();
};
