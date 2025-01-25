import mongoose, { InferSchemaType, Schema } from "mongoose";
import { GYM_NAMES, GymName, LogCollection } from "@/utils";

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

// Infer base types from schemas
type BaseLogRecordType = InferSchemaType<typeof logRecordSchema>;

// Define interfaces with GymName type enforcement
export interface LogRecordType extends Omit<BaseLogRecordType, "gym"> {
  gym: GymName;
}

// Type definitions for models
export type LogRecordModelType = mongoose.Model<BaseLogRecordType>;

// Create model instances
export const logModel = mongoose.model(LogCollection, logRecordSchema);