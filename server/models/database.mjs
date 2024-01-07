import mongoose from 'mongoose';
import writeToCSV from '../utils/writeToCSV.mjs';

const Record = new mongoose.Schema({
  time: { type: Date, required: true },
  count: { type: Number, required: true },
  // TODO Add model input (boolean flags etc)
});

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
  return collections.map((collection) => collection.name);
};

export const getCollection = async (collection) => {
  // Ensure collection exists
  if (!await collectionExists(collection)) {
    throw new Error(`Collection (${collection}) does not exist`);
  }
  return mongoose.model(collection, Record, collection);
};

// Insert into a collection
export const gymInsert = async (gym, data) => {
  const collection = await getCollection(gym);
  collection.create(data);
  mongoose.deleteModel(gym);
};

// Get most recent record from a collection (gym)
export const GymGetRecentRecord = async (gym) => {
  const collection = await getCollection(gym);
  const record = collection.findOne().sort({ time: -1 });
  mongoose.deleteModel(gym);
  return record;
};

// gymFindById from a collection
export const gymFindById = async (gym, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`No such session: ${id}`);
  }

  const collection = await getCollection(gym);
  const record = collection.findById(id);
  mongoose.deleteModel(gym);
  return record;
};

// Get all Records from a collection
export const gymGetAllRecords = async (gym) => {
  const collection = await getCollection(gym);
  const records = collection.find({});
  mongoose.deleteModel(gym);
  return records;
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
