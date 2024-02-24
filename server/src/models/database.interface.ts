import { OccupancyRecord, GymOccupancyRecord, GymHours, AggregateData, GymName } from './database.types';

export default interface DB {
  /**
   * Checks if the specified collection exists.
   */
  collectionExists(collection: GymName): boolean

  /**
   * Inserts a OccupancyRecord into the specified gym's collection.
   */
  insert(gym: GymName, data: OccupancyRecord): Promise<void>

  /**
   * Returns array of gym collections
   */
  getGymCollections(): GymName[]
  /**
   * Retrieves all records from all gym collections.
   */
  getAllRecords(): Promise<GymOccupancyRecord[]>

  /**
   * Retrieves all records from all gym collections for a specific date
   * @param date
   */
  getAllRecordsByDate(date: Date): Promise<GymOccupancyRecord[]>

  /**
   * Retrieves all records from all gym collections for a specific date
   * @param date
   */
  deleteAllRecordsByDate(date: Date): Promise<void>

  /**
   * Retrieves all records from the specified gym's collection.
   */
  getRecords(gym: GymName): Promise<OccupancyRecord[]>

  /**
   * Retrieves all records from the specified gym's collection and date
   * @param gym gym to filter records
   * @param date date to filter records
   */
  getRecordsByDate(gym: GymName, date: Date): Promise<OccupancyRecord[]>

  /**
   * Retrieves the most recent record from the specified gym's collection.
   */
  getRecentRecord(gym: GymName): Promise<OccupancyRecord>

  /**
   Retrieves a specific record from the specified gym's collection by its ID.
  */
  getGymById(gym: GymName, id: string): Promise<OccupancyRecord>

  /**
   Retrieves a special gym schedule for a gym for a given date.
  */
  getGymHours(gym: GymName, date: Date): Promise<GymHours[]>

  /**
   Retrieves a special gym schedules for the next 7-days for a gym from a given date.
  */
  getNextWeekGymHours(gym: GymName, date: Date): Promise<GymHours[]>

  /**
   * Moves all records from gym collections to CSV files, then deletes all records.
   */
  moveAllRecords(): Promise<void>

  /**
   * Deletes all records from all gym collections.
   */
  deleteAllRecords(): Promise<void>

  /**
   * Inserts aggregate data into aggregate database
   * @param aggregateData
   */
  insertAggregate(aggregateData: AggregateData): Promise<void>;
}
