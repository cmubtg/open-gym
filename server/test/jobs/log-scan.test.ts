import db from '@/models/database';
import { logScanJob } from '@/jobs/log-scan'; // Adjust path as needed
import { 
  GYM_NAMES,
  OccupancyCollection,
  relativeDate,
  timeRoundedToNearestMinute
} from "@/utils";

jest.mock('@/models/database');
jest.mock('@/utils/date', () => ({
  timeRoundedToNearestMinute: jest.fn(),
  relativeDate: jest.fn(),
}));

describe('Log Scan Scheduler', () => {
  describe('logScanJob', () => {
    let mockInsertOccupancyRecords: jest.Mock;
    let mockGetLogRecords: jest.Mock;

    beforeEach(() => {
      mockInsertOccupancyRecords = db.insertOccupancyRecords as jest.Mock;
      mockGetLogRecords = db.getLogRecords as jest.Mock;

      jest.clearAllMocks();
    });

    it('should calculate occupancy using all log records and insert records into the database', async () => {
      // Mock the current time
      const mockCurrentTime = new Date('2025-01-23T10:05:00Z');
      (timeRoundedToNearestMinute as jest.Mock).mockReturnValue(mockCurrentTime);

      // Mock database responses for log records
      mockGetLogRecords.mockImplementation(async ({ gym }) => [
        { entries: 10, exits: 5 },
        { entries: 15, exits: 10 },
      ]);

      mockInsertOccupancyRecords.mockResolvedValue([
        { entries: 10, exits: 5 },
        { entries: 15, exits: 10 },
      ]);

      // Import and execute logScanJob
      await logScanJob();

      // Verify getLogRecords is called for each gym
      for (const gymName of GYM_NAMES) {
        expect(mockGetLogRecords).toHaveBeenCalledWith({ gym: gymName });
      }

      // Verify insertOccupancyRecords is called with the correct data
      const expectedRecords = GYM_NAMES.map((gym) => ({
        gym,
        time: mockCurrentTime,
        occupancy: (10 + 15) - (5 + 10), // sum of entries - sum of exits
      }));

      expect(mockInsertOccupancyRecords).toHaveBeenCalledWith(expectedRecords, OccupancyCollection.Current);
    });

    it('should handle errors thrown by the database methods gracefully', async () => {
      const error = new Error('Database error');
      mockGetLogRecords.mockRejectedValue(error);

      await expect(logScanJob()).rejects.toThrow('Database error');
    });
  });
});