import mongoose, { InferSchemaType, Schema } from "mongoose";

// Configuration settings schema - flexible schema to handle different types of settings
export const configSettingsSchema = new Schema({
    // Key for the configuration ("adminUsers", "gymMetadata", etc.)
    key: {
        type: String,
        required: true,
        unique: true,
        index: true
    },

    // Value can be any valid JSON structure
    value: {
        type: Schema.Types.Mixed,
        required: true
    },

    // Description of what this configuration is for
    description: {
        type: String
    },

});

// Create a type for the schema
type BaseConfigSettingsType = InferSchemaType<typeof configSettingsSchema>;

// Export the interface
export interface ConfigSettingsType extends BaseConfigSettingsType {}

// Export the collection name constant
export const ConfigSettingsCollection = "configSettings";

// Export the model
export const configSettingsModel = mongoose.model(
    ConfigSettingsCollection,
    configSettingsSchema
);