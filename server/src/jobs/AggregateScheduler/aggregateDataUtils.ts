import db from "../../models/database";
import { OccupancyRecord, GymOccupancyRecord, AggregateData } from "../../models/database.types";

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
export const aggregateOccucpancyData = (dailyData: GymOccupancyRecord[]) => {
  return dailyData.map(({ gym, data}) => {
    const groupedByHour = groupGymDataByHours(data);

    // Get average occupancy of for each hour
    const averagedByHour = groupedByHour.map(
      occupancies => occupancies.length === 0 ? 0 :
        occupancies.reduce((total, occ) => total + occ, 0) / occupancies.length
    );

    return { gym, data: averagedByHour };
  });
};

/**
 * Inserts aggregate data in the db
 * @param date date of aggregated data
 * @param allAggregateData data
 */
// export const insertAllAggregate = async (date: Date, allAggregateData: { gym: string; data: number[]; }[]) => {
//   const formattedDBData: AggregateData[] = allAggregateData.map(
//     ({ gym, data }) => {
//       const aggregateData: AggregateData = {
//         date: date,
//         occupancy: data,
//         collectionName: gym
//       };
//       return aggregateData;
//     });

//   for (const data of formattedDBData) {
//     await db.insertAggregate(data);
//   }
// };
