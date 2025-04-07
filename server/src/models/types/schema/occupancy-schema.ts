import mongoose, { InferSchemaType, Schema } from "mongoose";
import { OccupancyCollection, GYM_NAMES, GymName } from "@/utils";

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
  occupancy: { type: Number, required: true},
});

// Infer base types from schemas
type BaseOccupancyRecordType = InferSchemaType<typeof occupancyRecordSchema>;

// Define interfaces with GymName type enforcement
export interface OccupancyRecordType
  extends Omit<BaseOccupancyRecordType, "gym"> {
  gym: GymName;
}

// Type definitions for models
export type OccupancyRecordModelType = mongoose.Model<BaseOccupancyRecordType>;

// Create model instances
const occupancyRecordModels = {
  [OccupancyCollection.Aggregate]: mongoose.model(
    OccupancyCollection.Aggregate,
    occupancyRecordSchema
  ),
  [OccupancyCollection.Current]: mongoose.model(
    OccupancyCollection.Current,
    occupancyRecordSchema
  ),
  [OccupancyCollection.Forecast]: mongoose.model(
    OccupancyCollection.Forecast,
    occupancyRecordSchema
  ),
} as const;

// Export the occupancy record model map
export const OCCUPANCY_MODEL_MAP: Record<OccupancyCollection, OccupancyRecordModelType> =
  occupancyRecordModels;