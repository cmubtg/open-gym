import mongoose, { InferSchemaType, Schema } from "mongoose";
import { Collection, GYM_NAMES } from "../utils/constants";

// Define GymName type from constant array
export type GymName = (typeof GYM_NAMES)[number];

// Define Log Record Schema
/* LogRecordType is equivalent to the following TypeScript type:
{
    gym: GymName;
    time: Date;
    entries: number;
    exits: number;
}
*/
export const logRecordSchema = new Schema({
  gym: {
    type: String,
    required: true,
    enum: GYM_NAMES,
  },
  time: { type: Date, required: true },
  entries: { type: Number, required: true, min: 0 },
  exits: { type: Number, required: true, min: 0 },
});

// Define Occupancy Record Schema
/* OccupancyRecordType is equivalent to the following TypeScript type:
{
    gym: GymName;
    time: Date;
    occupancy: number;
}
*/
export const occupancyRecordSchema = new Schema({
  gym: {
    type: String,
    required: true,
    enum: GYM_NAMES,
  },
  time: { type: Date, required: true },
  occupancy: { type: Number, required: true, min: 0 },
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
type BaseLogRecordType = InferSchemaType<typeof logRecordSchema>;
type BaseOccupancyRecordType = InferSchemaType<typeof occupancyRecordSchema>;
type BaseGymHoursType = InferSchemaType<typeof gymHoursSchema>;

// Define interfaces with GymName type enforcement
export interface LogRecordType extends Omit<BaseLogRecordType, "gym"> {
  gym: GymName;
}
export interface OccupancyRecordType
  extends Omit<BaseOccupancyRecordType, "gym"> {
  gym: GymName;
}
export interface GymHoursType extends Omit<BaseGymHoursType, "gym"> {
  gym: GymName;
}

// Type definitions for models
export type LogRecordModelType = mongoose.Model<BaseLogRecordType>;
export type OccupancyRecordModelType = mongoose.Model<BaseOccupancyRecordType>;

// Create model instances
export const logModel = mongoose.model("logRecord", logRecordSchema);

const occupancyRecordModels = {
  [Collection.Aggregate]: mongoose.model(
    Collection.Aggregate,
    occupancyRecordSchema
  ),
  [Collection.Current]: mongoose.model(
    Collection.Current,
    occupancyRecordSchema
  ),
  [Collection.Forecast]: mongoose.model(
    Collection.Forecast,
    occupancyRecordSchema
  ),
} as const;

// Export the occupancy record model map
export const MODEL_MAP: Record<Collection, OccupancyRecordModelType> =
  occupancyRecordModels;

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
