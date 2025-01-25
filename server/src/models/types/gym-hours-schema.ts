import mongoose, { InferSchemaType, Schema } from "mongoose";
import { GYM_NAMES, GymName, GymHoursCollection } from "@/utils";

// Gym Hours Schema
export const gymHoursSchema = new Schema({
  gym: { type: String, required: true, enum: GYM_NAMES },
  date: { type: Date, required: true },
  open: { type: String, required: true },
  close: { type: String, required: true },
  description: { type: String },
});

type BaseGymHoursType = InferSchemaType<typeof gymHoursSchema>;

export interface GymHoursType extends Omit<BaseGymHoursType, "gym"> {
  gym: GymName;
}

// Export the gym hours model
export const gymHoursModel = mongoose.model(GymHoursCollection, gymHoursSchema);