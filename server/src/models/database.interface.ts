import { TENSE } from '../utils/constants';
import { OccupancyRecord, GymHours, DBOptionType } from './database.types';

export default interface DB {
  // For all functions with options, the date range must match the tense.

  /**
   * Inserts a OccupancyRecord into the specified gym's collection.
   * @param data the record to insert
   * @param tense the collection to insert the record into PAST, PRESENT, or FUTURE
   */
  insertOne(data: OccupancyRecord, tense: TENSE): Promise<void>

  /**
   * Inserts many into a OccupancyRecord into the specified gym's collection.
   * @param data the records to insert
   * @param tense the collection to insert the records into PAST, PRESENT, or FUTURE
   */
  insertMany(data: OccupancyRecord[], tense: TENSE): Promise<void>

  /**
   * Retrieves all records from the specified gym's collection from the PAST,
   * PRESENT or FUTURE for a defined time range.
   *
   * @param options the options to filter the records
   * @param options.gym the gym to retrieve records from
   * @param options.dateRange the date range to retrieve records from
   * @param options.tense the tense to retrieve records from
   *
   * If gym is not specified, retrieves all records from all gyms
   * If dateRange is not specified, retrieves all records from the current day
   * If tense is not specified, retrieves all records from the PRESENT collection
   *
   * @returns a list of records
   */
  getRecords(options?: DBOptionType): Promise<OccupancyRecord[]>

  /**
   * Retrieves the most recent record from the specified gym's collection.
   * @param options the options to filter the records
   * @param options.gym the gym to retrieve records from
   * @param options.dateRange the date range to retrieve records from
   * @param options.tense the tense to retrieve records from
   *
   * If gym is not specified, retrieves the most recent record from all gyms
   * If dateRange is not specified, retrieves the most recent record from the current day
   * If tense is not specified, retrieves the most recent record from the PRESENT collection
   *
   * Warning: This function should only be used to for the PRESENT tense.
   * Warning: This function is not guaranteed to return a record if no records exist.
   * @returns a list of the most recent record
   */
  getRecentRecords(options?: DBOptionType): Promise<OccupancyRecord[]>

  /**
   * Deletes all records in a time range from the specified gym from the PAST, PRESENT, or FUTURE collections.
   * @param options the options to filter the records
   * @param options.gym the gym to delete records from
   * @param options.dateRange the date range to delete records from
   * @param options.tense the tense to delete records from
   *
   * If gym is not specified, deletes all records from all gyms
   * If dateRange is not specified, deletes all records from the current day
   * If tense is not specified, deletes all records from the PRESENT collection
   *
   * Warning: Don't accidentally delete all records.
   */
  deleteRecords(options?: DBOptionType): Promise<void>

  /**
   * Retrieves a special gym schedule for a gym for a given date.
   * @param options the options to filter the records
   * @param options.gym the gym to retrieve records from
   * @param options.date the date to retrieve records from
   * @param options.tense should not be used for this function
   *
   * If gym is not specified, retrieves the schedule for all gyms
   * If date is not specified, retrieves the schedule for the current day
   *
   * @returns a list of gym hours
   */
   getGymHours(options?: DBOptionType): Promise<GymHours[]>

}
