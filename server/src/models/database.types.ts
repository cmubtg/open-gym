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

export const metaDataSchema = new Schema({
  collectionName: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  maxOccupancy: { type: Number, required: true },
  hours: {
    type: {
      sunday: {
        type: {
          open: { type: String, required: true },
          close: { type: String, required: true },
        },
        required: true
      },
      monday: {
        type: {
          open: { type: String, required: true },
          close: { type: String, required: true },
        },
        required: true
      },
      tuesday: {
        type: {
          open: { type: String, required: true },
          close: { type: String, required: true },
        },
        required: true
      },
      wednesday: {
        type: {
          open: { type: String, required: true },
          close: { type: String, required: true },
        },
        required: true
      },
      thursday: {
        type: {
          open: { type: String, required: true },
          close: { type: String, required: true },
        },
        required: true
      },
      friday: {
        type: {
          open: { type: String, required: true },
          close: { type: String, required: true },
        },
        required: true
      },
      saturday: {
        type: {
          open: { type: String, required: true },
          close: { type: String, required: true },
        },
        required: true
      },
    },
    required: true,
  },
});

export type Metadata = InferSchemaType<typeof metaDataSchema>;

export const aggregateDataSchema = new Schema({
  collectionName: { type: String, required: true },
  date: { type: Date, required: true },
  occupancy: { type: [Number], required: true },
});

export type AggregateData = InferSchemaType<typeof aggregateDataSchema>;
