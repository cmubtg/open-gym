import mongoose from 'mongoose';
import writeToCSV from '../utils/writeToCSV.mjs';

const sessionSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    time: {type: Date, required: true},
}, {timestamps: true});

// Extend Session model with custom methods
sessionSchema.statics.getAllData = async () => {
    return await this.find({});
}

sessionSchema.statics.deleteAllData = async () => {
    // *** Insert deletion code HERE ***
}

sessionSchema.statics.moveAllData = async () => { 
    const data = await this.find({});
    writeToCSV(data);
    deleteAllData();
}

export default mongoose.model('Session', sessionSchema);

