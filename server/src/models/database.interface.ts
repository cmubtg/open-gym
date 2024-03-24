import { TENSE } from '../utils/constants';
import { OccupancyRecord, GymHours, DBOptionType } from './database.types';

export default interface DB {

  /**
   * Inserts a OccupancyRecord into the specified gym's collection.
   */
  insertOne(data: OccupancyRecord, tense: TENSE): Promise<void>

  /**
   * Inserts many into a OccupancyRecord into the specified gym's collection.
   */
  insertMany(data: OccupancyRecord[], tense: TENSE): Promise<void>

  /**
   * Retrieves all records from the specified gym's collection.
   */
  getRecords(options?: DBOptionType): Promise<OccupancyRecord[]>

  /**
   * Retrieves the most recent record from the specified gym's collection.
   */
  getRecentRecords(options?: DBOptionType): Promise<OccupancyRecord[]>

  /**
   * Deletes all records from all gym collections.
   */
  deleteRecords(options?: DBOptionType): Promise<void>

  /**
   Retrieves a special gym schedule for a gym for a given date.
  */
   getGymHours(options?: DBOptionType): Promise<GymHours[]>

}
