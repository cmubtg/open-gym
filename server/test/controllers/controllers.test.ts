import { Request, Response } from 'express';
import * as Controller from '../../src/controllers/controllers';
import db from '../../src/models/database';
import * as Predict from '../../src/services/predictOccupancyService';
import * as Metadata from '../../src/services/gymMetadataService';
import { Collection, HttpStatus } from '../../src/utils/constants';
import 'jest';

jest.mock('../../src/models/database');
jest.mock('../../src/services/predictOccupancyService');
jest.mock('../../src/services/gymMetadataService');
jest.mock('../../src/utils/helper', () => ({
  errorMessage: jest.fn((error) => `Error: ${error.message}`)
}));

describe('Controller Tests', () => {

  describe('GetAllRecords', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockStatus: jest.Mock;
    let mockJson: jest.Mock;

    beforeEach(() => {
      mockStatus = jest.fn().mockReturnThis();
      mockJson = jest.fn();
      req = {};
      res = { status: mockStatus, json: mockJson };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return all records with status 200 for all gyms', async () => {
      const mockData = [
        { gym: 'tepperFC', time: '2024-10-25T10:00:00.000Z', occupancy: 20 },
        { gym: 'cohonFC', time: '2024-10-25T11:00:00.000Z', occupancy: 25 },
      ];
      (db.getRecords as jest.Mock).mockResolvedValue(mockData);

      await Controller.getAllRecords(req as Request, res as Response);

      expect(db.getRecords).toHaveBeenCalledWith();
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockJson).toHaveBeenCalledWith(mockData);
    });

    it('should return status 400 and an error message if db.getRecords throws an error', async () => {
      const error = new Error('Database error');
      (db.getRecords as jest.Mock).mockRejectedValue(error);

      await Controller.getAllRecords(req as Request, res as Response);

      expect(db.getRecords).toHaveBeenCalledWith();
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BadRequest);
      expect(mockJson).toHaveBeenCalledWith({ error: `Error: ${error.message}` });
    });
  });

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

  describe('GetAllOccupancies', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockStatus: jest.Mock;
    let mockJson: jest.Mock;

    beforeEach(() => {
      mockStatus = jest.fn().mockReturnThis();
      mockJson = jest.fn();
      req = { params: {} };
      res = { status: mockStatus, json: mockJson };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });


    it('should return all occupanies with status 200', async () => {
      const mockData = [
        { occupancy: 20 },
        { occupancy: 25 },
        { occupancy: 30 },
      ];
      (db.getRecentRecords as jest.Mock).mockResolvedValue(mockData);

      await Controller.getAllOccupancy(req as Request, res as Response);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockJson).toHaveBeenCalledWith(mockData);
    });

    it('should return status 400 and an error message if db.getRecentRecords throws an error', async () => {
      const error = new Error('Database error');
      (db.getRecentRecords as jest.Mock).mockRejectedValue(error);

      await Controller.getAllOccupancy(req as Request, res as Response);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BadRequest);
      expect(mockJson).toHaveBeenCalledWith({ error: `Error: ${error.message}` });
    });
  });

  describe('PredictOccupancy', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockStatus: jest.Mock;
    let mockJson: jest.Mock;

    beforeEach(() => {
      mockStatus = jest.fn().mockReturnThis();
      mockJson = jest.fn();
      req = { params: { gym: 'tepperFC', timestamp: '2024-10-25T10:00:00.000Z' } };
      res = { status: mockStatus, json: mockJson };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return predicted occupancy with status 200 for a valid request', async () => {
      const mockPrediction = 30;
      (Predict.validatePredictRequest as jest.Mock).mockImplementation(() => {});
      (Predict.predictOccupancy as jest.Mock).mockResolvedValue(mockPrediction);

      await Controller.predictOccupancy(req as Request, res as Response);


      expect(Predict.validatePredictRequest).toHaveBeenCalledWith('tepperFC', '2024-10-25T10:00:00.000Z');
      expect(Predict.predictOccupancy).toHaveBeenCalledWith('tepperFC', new Date('2024-10-25T10:00:00.000Z'));
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockJson).toHaveBeenCalledWith({ occupancy: mockPrediction });

    });

    it('should return status 400 and an error message if validatePredictRequest throws an error', async () => {
      const validationError = new Error('Invalid Timestamp');

      (Predict.validatePredictRequest as jest.Mock).mockImplementation(() => {
        throw validationError;
      });

      await Controller.predictOccupancy(req as Request, res as Response);

      expect(Predict.validatePredictRequest).toHaveBeenCalledWith('tepperFC', '2024-10-25T10:00:00.000Z');
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BadRequest);
      expect(mockJson).toHaveBeenCalledWith({ error: `Error: ${validationError.message}` });
    });

    it('should return status 400 and an error message if predictOccupancy throws an error', async () => {
      const predictionError = new Error('Prediction error');

      (Predict.validatePredictRequest as jest.Mock).mockImplementation(() => {});
      (Predict.predictOccupancy as jest.Mock).mockRejectedValue(predictionError);

      await Controller.predictOccupancy(req as Request, res as Response);

      expect(Predict.validatePredictRequest).toHaveBeenCalledWith('tepperFC', '2024-10-25T10:00:00.000Z');
      expect(Predict.predictOccupancy).toHaveBeenCalledWith('tepperFC', new Date('2024-10-25T10:00:00.000Z'));
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BadRequest);
      expect(mockJson).toHaveBeenCalledWith({ error: `Error: ${predictionError.message}` });
    });
  });


  describe('getAllMetadata', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockStatus: jest.Mock;
    let mockJson: jest.Mock;

    beforeEach(() => {
      mockStatus = jest.fn().mockReturnThis();
      mockJson = jest.fn();
      req = {};
      res = { status: mockStatus, json: mockJson };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return metadata with status 200 when data is retrieved successfully', async () => {
      const mockData = [
        { name: 'tepperFC', location: 'Tepper' },
        { name: 'cohon', location: 'Cohon' },
      ];

      (Metadata.getAllMetadataHelper as jest.Mock).mockResolvedValue(mockData);

      await Controller.getAllMetadata(req as Request, res as Response);

      expect(Metadata.getAllMetadataHelper).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockJson).toHaveBeenCalledWith(mockData);
    });

    it('should return status 400 and an error message if getAllMetadataHelper throws an error', async () => {
      const error = new Error('Failed to retrieve metadata');
      (Metadata.getAllMetadataHelper as jest.Mock).mockRejectedValue(error);

      await Controller.getAllMetadata(req as Request, res as Response);

      expect(Metadata.getAllMetadataHelper).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BadRequest);
      expect(mockJson).toHaveBeenCalledWith({ error: `Error: ${error.message}` });
    });
  });


  describe('getMetadata', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockStatus: jest.Mock;
    let mockJson: jest.Mock;

    beforeEach(() => {
      mockStatus = jest.fn().mockReturnThis();
      mockJson = jest.fn();
      req = { params: { gym: 'wiegand' } };
      res = { status: mockStatus, json: mockJson };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return metadata with status 200 for a valid gym', async () => {
      const mockData = {
        name: 'Wiegand Gym',
        address: '123 Campus Drive',
        description: 'The main campus gym with all facilities',
        maxOccupancy: 100,
        hours: {
          sunday: { open: '8:00 AM', close: '10:00 PM', description: 'Open all day' },
          monday: { open: '6:00 AM', close: '10:00 PM', description: 'Open all day' },
          tuesday: { open: '6:00 AM', close: '10:00 PM', description: 'Open all day' },
          wednesday: { open: '6:00 AM', close: '10:00 PM', description: 'Open all day' },
          thursday: { open: '6:00 AM', close: '10:00 PM', description: 'Open all day' },
          friday: { open: '6:00 AM', close: '10:00 PM', description: 'Open all day' },
          saturday: { open: '8:00 AM', close: '10:00 PM', description: 'Open all day' },
        },
      };


      (Metadata.getGymMetadataHelper as jest.Mock).mockResolvedValue(mockData);

      await Controller.getMetadata(req as Request, res as Response);

      expect(Metadata.getGymMetadataHelper).toHaveBeenCalledWith('wiegand');
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockJson).toHaveBeenCalledWith(mockData);
    });

    it('should return status 400 and an error message if getGymMetadataHelper throws an error', async () => {
      const error = new Error('Gym not found');
      jest.spyOn(Metadata, 'getGymMetadataHelper').mockRejectedValue(error);

      await Controller.getMetadata(req as Request, res as Response);

      expect(Metadata.getGymMetadataHelper).toHaveBeenCalledWith('wiegand');
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BadRequest);
      expect(mockJson).toHaveBeenCalledWith({ error: `Error: ${error.message}` });
    });
  });

  describe('createRecord', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockStatus: jest.Mock;
    let mockJson: jest.Mock;

    beforeEach(() => {
      mockStatus = jest.fn().mockReturnThis();
      mockJson = jest.fn();
      req = { params: { gym: 'wiegand' }, body: { time: '2024-10-25T10:00:00.000Z', occupancy: 50 } };
      res = { status: mockStatus, json: mockJson };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should insert a new record and return success message', async () => {
      await Controller.createRecord(req as Request, res as Response);

      expect(db.insertOne).toHaveBeenCalledWith(
        { gym: 'wiegand', time: new Date('2024-10-25T10:00:00.000Z'), occupancy: 50 },
        Collection.Current
      );
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockJson).toHaveBeenCalledWith({ success: 'Inserted record into wiegand' });
    });

    it('should return a 400 status and error message if db.insertOne throws an error', async () => {
      const error = new Error('Database error');
      (db.insertOne as jest.Mock).mockRejectedValue(error);

      await Controller.createRecord(req as Request, res as Response);

      expect(db.insertOne).toHaveBeenCalledWith(
        { gym: 'wiegand', time: new Date('2024-10-25T10:00:00.000Z'), occupancy: 50 },
        Collection.Current
      );
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BadRequest);
      expect(mockJson).toHaveBeenCalledWith({ error: `Error: ${error.message}` });
    });
  });
});