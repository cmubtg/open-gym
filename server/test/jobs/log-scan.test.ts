import db from '../../src/models/database';
import { GYM_NAMES, Collection } from "../../src/utils/constants";
import { getRelativeDate, timeRoundedToNearestMinute } from "../../src/utils/date";
import { logScanJob } from '../../src/jobs/log-scan'; // Adjust path as needed

jest.mock('../../src/models/database');
jest.mock('../../src/utils/date', () => ({
  timeRoundedToNearestMinute: jest.fn(),
  getRelativeDate: jest.fn(),
}));

describe('Log Scan Scheduler', () => {
  describe('logScanJob', () => {
    let mockInsertOccupancyRecords: jest.Mock;
    let mockGetMostRecentLogRecord: jest.Mock;

    beforeEach(() => {
      mockInsertOccupancyRecords = db.insertOccupancyRecords as jest.Mock;
      mockGetMostRecentLogRecord = db.getMostRecentLogRecord as jest.Mock;

      jest.clearAllMocks();
    });

    it('should calculate occupancy and insert records into the database', async () => {
      // Mock the current time
      const mockCurrentTime = new Date('2025-01-23T10:05:00Z');
      (timeRoundedToNearestMinute as jest.Mock).mockReturnValue(mockCurrentTime);
      (getRelativeDate as jest.Mock).mockReturnValue(mockCurrentTime);

      // Mock database responses
      mockGetMostRecentLogRecord.mockImplementation(async ({ gym }) => ({
        gym,
        entries: 15,
        exits: 5,
      }));

      mockInsertOccupancyRecords.mockResolvedValue({
        gym: '',
        entries: 15,
        exits: 5,
      });

      // Import and execute logScanJob
      await logScanJob();

      // Verify getMostRecentLogRecord is called for each gym
      for (const gymName of GYM_NAMES) {
        expect(mockGetMostRecentLogRecord).toHaveBeenCalledWith({ gym: gymName });
      }

      // Verify insertOccupancyRecords is called with the correct data
      const expectedRecords = GYM_NAMES.map((gym) => ({
        gym,
        time: mockCurrentTime,
        occupancy: 15 - 5, // entries - exits
      }));

      expect(mockInsertOccupancyRecords).toHaveBeenCalledWith(expectedRecords, Collection.Current);
    });

    it('should handle errors thrown by the database methods gracefully', async () => {
      const error = new Error('Database error');
      mockGetMostRecentLogRecord.mockRejectedValue(error);

      await expect(logScanJob()).rejects.toThrow('Database error');
    });
  });
});