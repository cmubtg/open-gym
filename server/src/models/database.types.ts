import mongoose, { InferSchemaType, Schema } from 'mongoose';
import { GYM_NAMES } from '../utils/constants';

export type GymName = 'cohonFC' | 'tepperFC' | 'fairfax' | 'wiegand';


export const occupancyRecordSchema = new Schema({
  gym: { type: String, require: true },
  time: { type: Date, required: true },
  occupancy: { type: Number, required: true },
  // TODO Add model input (boolean flags etc)
});
export type OccupancyRecord = InferSchemaType<typeof occupancyRecordSchema>;

export const PastModel = mongoose.model('past', occupancyRecordSchema);
export const PresentModel = mongoose.model('present', occupancyRecordSchema);
export const FutureModel = mongoose.model('future', occupancyRecordSchema);
export const metadataModel = mongoose.model('metadata', occupancyRecordSchema);

// Controller type definitions
export interface GymOccupancyRecord {
  gym: string
  data: OccupancyRecord[]
}

export interface CurrentGymOccupancy {
  gym: string
  occupancy: number
}

export const gymRecordSchema = new Schema({
  gym: { type: String, required: true },
  data: { type: [occupancyRecordSchema], required: true },
});

export const gymHoursSchema = new Schema({
  gym: { type: String },
  date: { type: Date, required: true },
  open: { type: String, required: true },
  close: { type: String, required: true },
  description: { type: String }
});

export type GymHours = InferSchemaType<typeof gymHoursSchema>;

export interface DBOptionType {
  start: Date;
  end: Date;
  tense: string;
}
