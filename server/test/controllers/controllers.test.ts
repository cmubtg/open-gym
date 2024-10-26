import { Request, Response } from 'express';
import * as Controller from '../../src/controllers/controllers';
import db from '../../src/models/database';
import { HttpStatus } from '../../src/utils/constants';

jest.mock('../../src/models/database');
jest.mock('../../src/utils/helper', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  errorMessage: jest.fn((error) => `Error: ${error.message}`)
}));

describe('Controller Tests', () => {
  describe('GetRecords', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockStatus: jest.Mock;
    let mockJson: jest.Mock;

    beforeEach(() => {
      mockStatus = jest.fn().mockReturnThis();
      mockJson = jest.fn();
      req = { params: { gym: 'tepperFC' } };
      res = { status: mockStatus, json: mockJson };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return records with status 200 for a valid gym', async () => {
      const mockData = [
        { time: '2024-10-25T10:00:00.000Z', occupancy: 20 },
        { time: '2024-10-25T11:00:00.000Z', occupancy: 25 },
      ];
      (db.getRecords as jest.Mock).mockResolvedValue(mockData);

      await Controller.getRecords(req as Request, res as Response);

      expect(db.getRecords).toHaveBeenCalledWith({ gym: 'tepperFC' });
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockJson).toHaveBeenCalledWith(mockData);
    });

    it('should return status 400 and an error message if db.getRecords throws an error', async () => {
      const error = new Error('Database error');
      (db.getRecords as jest.Mock).mockRejectedValue(error);

      await Controller.getRecords(req as Request, res as Response);

      expect(db.getRecords).toHaveBeenCalledWith({ gym: 'tepperFC' });
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BadRequest);
      expect(mockJson).toHaveBeenCalledWith({ error: `Error: ${error.message}` });
    });
  });
});