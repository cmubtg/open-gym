import mongoose, { Schema } from 'mongoose';
import writeToCSV from '../utils/writeToCSV.mjs';
// import { getCurrentDay, getFormattedDate } from '../utils/date.mjs';

const Record = {
    time: {type: Date, required: true},
    count: {type: Number, required: true}
};

const conn = mongoose.connection;

export const getAllCollections = async () => {
    const collections = await conn.db.listCollections().toArray();
    return collections;
}

// Check if a collection exists
const collectionExists = async (collection) => {
    const collections = await getAllCollections();
    return collections.some(c => c.name === collection);
}

export const getCollection = async (collection) => {
    // Ensure collection exists
    if (!await collectionExists(collection)) {
        const error = new Error(`Collection (${collection}) does not exist`);
        error.code = 'collectionDoesNotExist';
        throw error;
    }
    return mongoose.model(collection, Record, collection)
}

// Insert into a collection
export const GymInsert = async (gym, occupancy) => {
    try {
        const collection = await getCollection(gym);
        collection.create({
            time: new Date(),
            count: occupancy
        })

    } catch (err) {
      if (err.code === 'collectionDoesNotExist') {
        // Error for not providing a valid collection name
        console.log(err.message);
      } else {
        throw err;
      }
    }
    // Remove model after used so next call can recreate it
    // for the same collection
    mongoose.deleteModel(gym);
}

// Get most recent record from a collection (gym)
export const GymGetRecentRecord = async (gym) => {
    const collection = await getCollection(gym);
    const record = collection.findOne().sort({time: -1});
    mongoose.deleteModel(gym);
    return record;
}

// GymFindByID from a collection
export const GymFindByID = (gym, id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) { 
      throw new Error(`No such session: ${id}`);
    }
    
    const record = getCollection(gym).findByID(id);
    mongoose.deleteModel(gym);
    return record;
}

// Get all Records from a collection 
export const GymGetAllRecords = (gym) => {
    const record = getCollection(gym).find({});
    mongoose.deleteModel(gym);
    return record
}

// Delete from a collection
export const GymDeleteAllRecords = (gym) => {
    // *** Insert deletion code HERE ***
}

// Move all data from a collection
export const GymMoveAllRecords = async (gym) => { 
    const data = await GymGetAllRecords(gym);
    writeToCSV(data);
    GymDeleteAllRecords(gym);
}