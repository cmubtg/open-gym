import { InferSchemaType, Schema } from 'mongoose';

export type GymName = 'cohonFC' | 'tepperFC' | 'fairfax' | 'wiegand';

export const occupancyRecordSchema = new Schema({
  time: { type: Date, required: true },
  occupancy: { type: Number, required: true },
  // TODO Add model input (boolean flags etc)
});
export type OccupancyRecord = InferSchemaType<typeof occupancyRecordSchema>;

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

export const aggregateDataSchema = new Schema({
  collectionName: { type: String, required: true },
  date: { type: Date, required: true },
  occupancy: { type: [Number], required: true },
});

export type AggregateData = InferSchemaType<typeof aggregateDataSchema>;
