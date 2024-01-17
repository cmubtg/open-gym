import { OccupancyRecord, GymOccupancyRecord, Metadata } from './database.types';

export default interface DB {
  /**
   * Checks if the specified collection exists.
   */
  collectionExists(collection: string): Promise<boolean>
  
  /**
   * Inserts a OccupancyRecord into the specified gym's collection.
   */
  insert(gym: string, data: OccupancyRecord): Promise<void>

  /**
   * Retrieves names of all gym collections, excludes metadata collection.
   */
  getAllNames(): Promise<string[]>

  /**
   * Retrieves all records from all gym collections.
   */
  getAllRecords(): Promise<GymOccupancyRecord[]>

  /**
   * Retrieves metadata for all gym collections.
   */
  getAllMetadata(): Promise<Metadata[]>

  /**
   * Retrieves all records from the specified gym's collection.
   */
  getRecords(gym: string): Promise<OccupancyRecord[]>

  /**
   * Retrieves the most recent record from the specified gym's collection.
   */
  getRecentRecord(gym: string): Promise<OccupancyRecord>

  /**
   * Retrieves metadata for the specified gym collection.
   */
  getMetadata(gym: string): Promise<Metadata>

  /**
   Retrieves a specific record from the specified gym's collection by its ID.
  */
  getGymById(gym: string, id: string): Promise<OccupancyRecord>


  /**
   * Moves all records from gym collections to CSV files, then deletes all records.
   */
  moveAllRecords(): Promise<void>

  /**
   * Deletes all records from all gym collections.
   */
  deleteAllRecords(): Promise<void>

}
