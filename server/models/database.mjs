import mongoose, { Schema } from 'mongoose';
import writeToCSV from '../utils/writeToCSV.mjs';
import { getCurrentDay, getFormattedDate } from '../utils/date.mjs';

const docSchema = {
    time: {type: Date, required: true},
    count: {type: Number, required: true}
};

const conn = mongoose.connection;

const collectionExists = async (collection) => {
    const collections = await conn.db.listCollections().toArray();
    return collections.some(c => c.name === collection);
}

export const getCollection = async (collection) => {
    // Ensure collection exists
    if (!await collectionExists(collection)) {
        const error = new Error(`Collection (${collection}) does not exist`);
        error.code = 'collectionDoesNotExist';
        throw error;
    }
    return mongoose.model(collection, docSchema)
}

// Insert into a collection
export const GymInsert = async (gym, occupancy) => {
    try {
        const collection = await getCollection(gym);
        collection.create({
            time: new Date(),
            count: occupancy
        });

    } catch (err) {
      if (err.code === 'collectionDoesNotExist') {
        // Error for not providing a valid collection name
        console.log(err.message);
      } else {
        throw err;
      }
    }
}

// GymFindByID from a collection
export const GymFindByID = (gym, id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) { 
      throw new Error(`No such session: ${id}`);
    }
    
    const collection = getCollection(gym);
    return collection.findByID(id);
}

// Get all from a collection 
export const GymGetAllData = (gym) => {
    const collection = getCollection(gym);
    return collection.find({});
}

// Delete from a collection
export const GymDeleteAllData = (gym) => {
    // *** Insert deletion code HERE ***
}

// Move all data from a collection
export const GymMoveAllData = async (gym) => { 
    const data = await GymGetAllData(gym);
    writeToCSV(data);
    deleteAllData(gym);
}