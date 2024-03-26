import { GymName, OccupancyRecord } from "../../models/database.types";
import { getNthHour } from "../../utils/date";

interface GymOccupancyRecord {
  gym: string;
  data: OccupancyRecord[];
}

/**
 * Groups occupancy records by hour
 * @param data array of occupancy records
 * @returns array of occupancy records grouped by hour
 * (A[i] = OccupancyRecord[] from i:00-i+1:00)
 */
const groupGymDataByHours = (data: OccupancyRecord[]) => {
  const occupancyAtEachHour = Array.from<null, number[]>({ length: 24 }, () => []);

  return data.reduce((group, record) => {
    const { time, occupancy } = record;
    const hour = time.getHours();
    const prevData: number[] = group[hour];
    prevData.push(occupancy);
    group[hour] = prevData;
    return group;
  }, occupancyAtEachHour);
};

/**
 * Aggregates daily occupancy data for all gyms by the hour
 * @param dailyData  occupancy data
 * @returns aggregated data by the hour
 */
export const aggregateOccupancyData = (date: Date, { gym, data }: GymOccupancyRecord) => {
    const groupedByHour = groupGymDataByHours(data);

    // Get average occupancy of for each hour
    const averagedByHour = groupedByHour.map(
      occupancies => occupancies.length === 0 ? 0 :
        occupancies.reduce((total, occ) => total + occ, 0) / occupancies.length
    );

    return averagedByHour.map((occupancy, index) => ({
      gym: gym as GymName,
      time: getNthHour(date, index),
      occupancy
    }));
};
