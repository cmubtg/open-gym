import * as metadata from "@/../data/metadata.json";
import { GYM_NAMES, GymName } from "@/utils";
import { getSpecialSchedule } from "./gym-hours-service";

/**
 * Get all metadata for all gyms
 * @returns metadata for all gyms
 */
export const getAllMetadataHelper = async () => {
  for (const gymName of GYM_NAMES) {
    metadata[gymName].hours = await getSpecialSchedule(new Date(), gymName);
  }
  return metadata;

};

/**
 * Get metadata for a specific gym
 * @param gym gym to get metadata for
 * @returns metadata for the gym
 */
export const getGymMetadataHelper = async (gym: GymName) => {
  metadata[gym].hours = await getSpecialSchedule(new Date(), gym);
  return metadata[gym];
};
