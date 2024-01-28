import { InferSchemaType, Schema } from 'mongoose';

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
  gym: { type: String, required: true },
  date: { type: Date, required: true },
  open: { type: String, required: true },
  close: { type: String, required: true },
});

export type GymHours = InferSchemaType<typeof gymHoursSchema>;

export interface Hours {
  date: Date,
  open: string,
  close: string
}
