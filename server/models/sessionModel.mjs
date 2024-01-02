import mongoose from 'mongoose';
import writeToCSV from '../utils/writeToCSV.mjs';

const sessionSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    time: {type: Date, required: true},
}, {timestamps: true});

const Session = mongoose.model('Session', sessionSchema);

// Extend Session model with custom methods
export const getAllData = async () => {
    return await Session.find({});
}

export const deleteAllData = async () => {
    // *** Insert deletion code HERE ***
}

export const moveAllData = async () => { 
    const data = await getAllData();
    writeToCSV(data);
    deleteAllData();
}

export const create = async (data) => {
    return await Session.create(data);
}

export const findById = async (id) => {
    return await Session.findById(id);
}
