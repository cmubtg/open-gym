import { OccupancyCollection, GymName } from "@/utils";

// Database query options interface
export interface DBOptionType {
  gym?: GymName;
  dateRange?: {
    start: Date;
    end: Date;
  };
  collection?: OccupancyCollection;
}