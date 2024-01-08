import mongoose from 'mongoose';

export const recordSchema = new mongoose.Schema({
  time: { type: Date, required: true },
  occupancy: { type: Number, required: true },
  // TODO Add model input (boolean flags etc)
});

const hoursSchema = {
  open: { type: String, required: true },
  close: { type: String, required: true },
};

export const metaDataSchema = new mongoose.Schema({
  collection_name: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  hours: {
    sunday: hoursSchema,
    monday: hoursSchema,
    tuesday: hoursSchema,
    wednesday: hoursSchema,
    thursday: hoursSchema,
    friday: hoursSchema,
    saturday: hoursSchema,
  },
  max_occupancy: { type: Number, required: true },
});
