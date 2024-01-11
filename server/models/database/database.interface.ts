import { BTG_Record, BTG_Gym_Record, BTG_Metadata } from './database.types';

export default interface DB_Interface {
  /**
   * Checks if the specified collection exists.
   */
  collectionExists(collection: string): Promise<boolean>
  
  /**
   * Inserts a BTG_Record into the specified gym's collection.
   */
  insert(gym: string, data: BTG_Record): Promise<void>

  /**
   * Retrieves names of all gym collections, excludes metadata collection.
   */
  getAllNames(): Promise<string[]>

  /**
   * Retrieves all records from all gym collections.
   */
  getAllRecords(): Promise<BTG_Gym_Record[]>

  /**
   * Retrieves metadata for all gym collections.
   */
  getAllMetadata(): Promise<BTG_Metadata[]>

  /**
   * Retrieves all records from the specified gym's collection.
   */
  getRecords(gym: string): Promise<BTG_Record[]>

  /**
   * Retrieves the most recent record from the specified gym's collection.
   */
  getRecentRecord(gym: string): Promise<BTG_Record>

  /**
   * Retrieves metadata for the specified gym collection.
   */
  getMetadata(gym: string): Promise<BTG_Metadata>

  /**
   Retrieves a specific record from the specified gym's collection by its ID.
  */
  getGymById(gym: string, id: string): Promise<BTG_Record>


  /**
   * Moves all records from gym collections to CSV files, then deletes all records.
   */
  moveAllRecords(): Promise<void>

  /**
   * Deletes all records from all gym collections.
   */
  deleteAllRecords(): Promise<void>

}
