import mongoose, { InferSchemaType, Schema } from "mongoose";
import { Collection, GYM_NAMES } from "../utils/constants";

// Infer the GymName type from the array values
export type GymName = (typeof GYM_NAMES)[number];

// Define Occupancy Record Schema and type.
/* OccupancyRecord is equivalent to the following TypeScript type:
{
    gym: GymName;
    time: Date;
    occupancy: number;
}
*/
export const occupancyRecordSchema = new Schema({
  gym: { type: String, required: true },
  time: { type: Date, required: true },
  occupancy: { type: Number, required: true },
  // TODO Add model input (boolean flags etc)
});
type baseOccupancyRecord = InferSchemaType<typeof occupancyRecordSchema>;
// Enforce gym field to be of type GymName
export interface OccupancyRecord extends Omit<baseOccupancyRecord, "gym"> {
  gym: GymName;
}

// Create Gym Hours.
/* GymHours is equivalent to the following TypeScript type:
{
    gym: GymName;
    date: Date;
    close: string;
    open: string;
    description?: string | undefined;
}
*/
export const gymHoursSchema = new Schema({
  gym: { type: String, required: true },
  date: { type: Date, required: true },
  open: { type: String, required: true },
  close: { type: String, required: true },
  description: { type: String },
});
type baseGymHours = InferSchemaType<typeof gymHoursSchema>;
export interface GymHours extends Omit<baseGymHours, "gym"> {
  gym: GymName;
}
// Options for querying the database.
export interface DBOptionType {
  gym?: GymName;
  dateRange?: { start: Date; end: Date };
  collection?: Collection;
}

export type Model = mongoose.Model<baseOccupancyRecord>;

// Create corresponding models.
const AggregateModel = mongoose.model(
  Collection.Aggregate,
  occupancyRecordSchema
);
const CurrentModel = mongoose.model(Collection.Current, occupancyRecordSchema);
const ForecastModel = mongoose.model(
  Collection.Forecast,
  occupancyRecordSchema
);
export const GymHoursModel = mongoose.model("gymHours", gymHoursSchema);
// Key-value pair of Collection to Model.
export const MODEL_MAP: Record<Collection, Model> = {
  [Collection.Aggregate]: AggregateModel,
  [Collection.Current]: CurrentModel,
  [Collection.Forecast]: ForecastModel,
};
