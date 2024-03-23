import mongoose, { InferSchemaType, Schema } from 'mongoose';
import { TENSE } from '../utils/constants';

export type GymName = 'cohonFC' | 'tepperFC' | 'fairfax' | 'wiegand';


export const occupancyRecordSchema = new Schema({
  gym: { type: String, required: true },
  time: { type: Date, required: true },
  occupancy: { type: Number, required: true },
  // TODO Add model input (boolean flags etc)
});
export type OccupancyRecord = InferSchemaType<typeof occupancyRecordSchema>;

export const PastModel = mongoose.model(TENSE.PAST, occupancyRecordSchema);
export const PresentModel = mongoose.model(TENSE.PRESENT, occupancyRecordSchema);
export const FutureModel = mongoose.model(TENSE.FUTURE, occupancyRecordSchema);
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
