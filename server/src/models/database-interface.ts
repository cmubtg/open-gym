import { OccupancyCollection } from "@/utils";
import {
  OccupancyRecordType,
  LogRecordType,
  GymHoursType,
  DBOptionType,
  ConfigSettingsType,
} from "@/models/types";

export default interface DB {
  // For all functions with options, the date range must match the collection.

  /**
   * Inserts records into specified gym's collection.
   * @param data the records to insert
   * @param collection the collection to insert the records into
   */
  insertOccupancyRecords(
    data: OccupancyRecordType[],
    collection?: OccupancyCollection
  ): Promise<void>;

  /**
   * Retrieves all records from the specified gym's collection from the PAST,
   * PRESENT or FUTURE for a defined time range.
   *
   * @param options the options to filter the records
   * @param options.gym the gym to retrieve records from
   * @param options.dateRange the date range to retrieve records from
   * @param options.collection the collection to retrieve records from
   *
   * If gym is not specified, retrieves all records from all gyms
   * If dateRange is not specified, retrieves all records from the current day
   * If collection is not specified, retrieves all records from the PRESENT collection
   *
   * @returns a list of records in descending order of time
   */
  getOccupancyRecords(options?: DBOptionType): Promise<OccupancyRecordType[]>;

  /**
   * Inserts log records into Log collection
   * @param data the records to insert
   */
  insertLogRecords(data: LogRecordType[]): Promise<void>;

  /**
   * Retrieves all records from the specified gym's collection from Log collection.
   *
   * @param options the options to filter the records
   * @param options.gym the gym to retrieve records from
   * @param options.dateRange the date range to retrieve records from
   *
   * If gym is not specified, retrieves all records from all gyms
   * If dateRange is not specified, retrieves all records from the current day
   * ignores collection specification from DBOptionType
   *
   * @returns a list of log records in descending order of time
   */
  getLogRecords(options?: DBOptionType): Promise<LogRecordType[]>;

  /**
   * Retrieves a special gym schedule for a gym for a given date.
   * @param options the options to filter the records
   * @param options.gym the gym to retrieve records from
   * @param options.date the date to retrieve records from
   * @param options.collection should not be used for this function
   *
   * If gym is not specified, retrieves the schedule for all gyms
   * If date is not specified, retrieves the schedule for the current day
   *
   * @returns a list of gym hours
   */
  getGymHours(options?: DBOptionType): Promise<GymHoursType[]>;

  /**
   * Gets a configuration setting by key
   * @param key the key of the configuration setting to get
   * TODO: n/BPS-337 : Implement set config settings and get all config settings
   */

  getConfigSetting(key: string): Promise<ConfigSettingsType | null>;

}
