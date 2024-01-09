import { InferSchemaType, Schema } from 'mongoose';

export type Record = InferSchemaType<typeof recordSchema>

export const recordSchema = new Schema({
  time: { type: Date, required: true },
  occupancy: { type: Number, required: true },
  // TODO Add model input (boolean flags etc)
});

export const metaDataSchema = new Schema({
  collection_name: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  max_occupancy: { type: Number, required: true },
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

export type Metadata = InferSchemaType<typeof metaDataSchema>
