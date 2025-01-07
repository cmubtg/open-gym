import mongoose, { InferSchemaType, Schema } from "mongoose";
import { Collection, GYM_NAMES, Direction } from "../utils/constants";

// Define GymName type from constant array
export type GymName = (typeof GYM_NAMES)[number];

// Define Occupancy Record Schema
/* RecordType is equivalent to the following TypeScript type:
{
    gym: GymName;
    time: Date;
    occupancy: number;
}
*/
export const recordSchema = new Schema({
  gym: {
    type: String,
    required: true,
    enum: GYM_NAMES,
  },
  time: { type: Date, required: true },
  log: { type: Number, required: true, min: -1 },
});

// Gym Hours Schema
export const gymHoursSchema = new Schema({
  gym: { type: String, required: true, enum: GYM_NAMES },
  date: { type: Date, required: true },
  open: { type: String, required: true },
  close: { type: String, required: true },
  description: { type: String },
});

// Infer base types from schemas
type BaseRecordType = InferSchemaType<typeof recordSchema>;
type BaseGymHoursType = InferSchemaType<typeof gymHoursSchema>;

// Define interfaces with GymName type enforcement
export interface RecordType extends Omit<BaseRecordType, "gym"> {
  gym: GymName;
}
export interface GymHoursType extends Omit<BaseGymHoursType, "gym"> {
  gym: GymName;
}

// Type definitions for models
export type RecordModelType = mongoose.Model<BaseRecordType>;

// Create model instances
const models = {
  [Collection.Aggregate]: mongoose.model(Collection.Aggregate, recordSchema),
  [Collection.Current]: mongoose.model(Collection.Current, recordSchema),
  [Collection.Forecast]: mongoose.model(Collection.Forecast, recordSchema),
  [Collection.Log]: mongoose.model(Collection.Log, recordSchema),
} as const;

// Export the model map
export const MODEL_MAP: Record<Collection, RecordModelType> = models;

// Export the gym hours model
export const gymHoursModel = mongoose.model("gymHours", gymHoursSchema);

// Database query options interface
export interface DBOptionType {
  gym?: GymName;
  dateRange?: {
    start: Date;
    end: Date;
  };
  collection?: Collection;
}
