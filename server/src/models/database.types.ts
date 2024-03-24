import mongoose, { InferSchemaType, Schema } from 'mongoose';
import { TENSE } from '../utils/constants';

export type GymName = 'cohonFC' | 'tepperFC' | 'fairfax' | 'wiegand';

export const occupancyRecordSchema = new Schema({
  gym: { type: String, required: true },
  time: { type: Date, required: true },
  occupancy: { type: Number, required: true },
  // TODO Add model input (boolean flags etc)
});

type incompleteOccupancyRecord = InferSchemaType<typeof occupancyRecordSchema>;
/* OccupancyRecord is equivalent to the following TypeScript type:
{
    gym: GymName;
    time: Date;
    occupancy: number;
}
*/
export interface OccupancyRecord extends Omit<incompleteOccupancyRecord, 'gym'> {
  gym: GymName;
}

export const gymHoursSchema = new Schema({
  gym: { type: String, required: true },
  date: { type: Date, required: true },
  open: { type: String, required: true },
  close: { type: String, required: true },
  description: { type: String }
});

type incompleteGymHours = InferSchemaType<typeof gymHoursSchema>;
/* GymHours is equivalent to the following TypeScript type:
{
    gym: GymName;
    date: Date;
    close: string;
    open: string;
    description?: string | undefined;
}
*/
export interface GymHours extends Omit<incompleteGymHours, 'gym'> {
  gym: GymName;
}

const PastModel = mongoose.model(TENSE.PAST, occupancyRecordSchema);
const PresentModel = mongoose.model(TENSE.PRESENT, occupancyRecordSchema);
const FutureModel = mongoose.model(TENSE.FUTURE, occupancyRecordSchema);

export const ModelMap: Record<TENSE, mongoose.Model<incompleteOccupancyRecord>> = {
  [TENSE.PAST]: PastModel,
  [TENSE.PRESENT]: PresentModel,
  [TENSE.FUTURE]: FutureModel
};

export const GymHoursModel = mongoose.model('gymHours', gymHoursSchema);

export interface DBOptionType {
  gym?: GymName;
  dateRange?: { start: Date, end: Date };
  tense?: TENSE;
}
