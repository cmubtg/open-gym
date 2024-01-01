import mongoose from 'mongoose';
import writeToCSV from '../utils/writeToCSV.mjs';


const sessionSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    time: {type: Date, required: true},
}, {timestamps: true});

// Extend Session model with custom methods
sessionSchema.statics.getAllData = async function() {
    return await this.find({});
  }
sessionSchema.statics.deleteAllData = async function(){
    // *** Insert deletion code HERE ***
  }
sessionSchema.statics.moveAllData = async function () { 
    const data = await this.find({});
    writeToCSV(data);
    deleteAllData();
  }

export default mongoose.model('Session', sessionSchema);

