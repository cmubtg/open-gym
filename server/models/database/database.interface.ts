import { BTG_Record, BTG_Metadata } from './database.types';

export default interface DB_Interface {
  insert(gym: string, data: BTG_Record): Promise<void>  

  getAllNames(): Promise<string[]>
  getAllMetadata(): Promise<BTG_Metadata[]>

  getRecords(gym: string): Promise<BTG_Record[]>
  getRecentRecord(gym: string): Promise<BTG_Record>
  getMetadata(gym: string): Promise<BTG_Metadata>

  moveAllRecords(): Promise<void>
  deleteAllRecords(): Promise<void>
  getGymById(gym: string, id: string): Promise<BTG_Record>
}
