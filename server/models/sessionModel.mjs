import mongoose from 'mongoose';
import writeToCSV from '../utils/writeToCSV.mjs';

const sessionSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    time: {type: Date, required: true},
}, {timestamps: true});

const Session = mongoose.model('Session', sessionSchema);

// Extend Session model with custom methods
export const getAllData = () => {
    return Session.find({});
}

export const deleteAllData = () => {
    // *** Insert deletion code HERE ***
}

export const moveAllData = async () => { 
    const data = await getAllData();
    writeToCSV(data);
    deleteAllData();
}

export const create = (data) => {
    return Session.create(data);
}

export const findById = (id) => {
    return Session.findById(id);
}
