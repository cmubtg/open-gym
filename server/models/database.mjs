import mongoose from 'mongoose';
import * as Constants from './databaseConstants.mjs';
import * as Schema from './databaseSchema.mjs';
import writeToCSV from '../utils/writeToCSV.mjs';

const conn = mongoose.connection;

const getAllCollections = async () => {
  return await conn.db.listCollections().toArray();
};

// Check if a collection exists
const collectionExists = async (collection) => {
  const collections = await getAllCollections();
  return collections.some((c) => c.name === collection);
};

// PUBLIC FUNCTIONS

export const getAllGymNames = async () => {
  const collections = await getAllCollections();
  const collectionNames = collections.map((collection) => collection.name);
  return collectionNames.filter((name) => name !== Constants.metadata);
};

export const getCollection = async (collection) => {
  // Ensure collection exists
  if (!await collectionExists(collection)) {
    throw new Error(`Collection (${collection}) does not exist`);
  }
  const schema = collection === Constants.metadata ?
    Schema.metaDataSchema : Schema.recordSchema;

  return mongoose.model(collection, schema, collection);
};

// Insert into a collection
export const gymInsert = async (gym, data) => {
  const collection = await getCollection(gym);
  collection.create(data);
  mongoose.deleteModel(gym);
};

// Get most recent record from a collection (gym)
export const gymGetRecentRecord = async (gym) => {
  const collection = await getCollection(gym);
  const record = await collection.findOne().sort({ time: -1 });
  mongoose.deleteModel(gym);
  return record;
};

// gymFindById from a collection
export const gymFindById = async (gym, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`No such session: ${id}`);
  }

  const collection = await getCollection(gym);
  const record = await collection.findById(id);
  mongoose.deleteModel(gym);
  return record;
};

// Get all Records from a collection
export const gymGetAllRecords = async (gym) => {
  const collection = await getCollection(gym);
  const records = await collection.find({});
  mongoose.deleteModel(gym);
  return records;
};

// Get all metadata
export const gymGetAllMetadata = async () => {
  const collection = await getCollection(Constants.metadata);
  const metadata = await collection.find({});
  mongoose.deleteModel(Constants.metadata);
  return metadata;
};

// Get gym metadata
export const gymGetGymMetadata = async (gym) => {
  const collection = await getCollection(Constants.metadata);
  const metadata = await collection.find({ collection_name: gym });
  mongoose.deleteModel(Constants.metadata);
  return metadata[0];
};

// Delete from a collection
export const gymDeleteAllRecords = () => {
  // *** Insert deletion code HERE ***
};

// Move all data from a collection
export const gymMoveAllRecords = async (gym) => {
  const data = await gymGetAllRecords(gym);
  writeToCSV(data);
  gymDeleteAllRecords();
};
