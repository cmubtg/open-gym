import { Request, Response } from "express";
import * as Controller from "@/controllers";
import db from "@/models/database";
import { HttpStatus } from "@/utils";
import * as Metadata from "@/services/gym-metadata-service";

jest.mock("@/models/database");
jest.mock("@/services/gym-metadata-service");
jest.mock("@/utils/helper", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  errorMessage: jest.fn((error) => `Error: ${error.message}`),
}));

describe("Controller Tests", () => {
  describe("GetRecords", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockStatus: jest.Mock;
    let mockJson: jest.Mock;

    beforeEach(() => {
      mockStatus = jest.fn().mockReturnThis();
      mockJson = jest.fn();
      req = { params: { gym: "tepperFC" } };
      res = { status: mockStatus, json: mockJson };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return records with status 200 for a valid gym", async () => {
      const mockData = [
        { time: "2024-10-25T10:00:00.000Z", occupancy: 20 },
        { time: "2024-10-25T11:00:00.000Z", occupancy: 25 },
      ];
      (db.getOccupancyRecords as jest.Mock).mockResolvedValue(mockData);

      await Controller.gymOccupancyRecords(req as Request, res as Response);

      expect(db.getOccupancyRecords).toHaveBeenCalledWith({ gym: "tepperFC" });
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockJson).toHaveBeenCalledWith(mockData);
    });

    it("should return status 400 and an error message if db.getRecords throws an error", async () => {
      const error = new Error("Database error");
      (db.getOccupancyRecords as jest.Mock).mockRejectedValue(error);

      await Controller.gymOccupancyRecords(req as Request, res as Response);

      expect(db.getOccupancyRecords).toHaveBeenCalledWith({ gym: "tepperFC" });
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BadRequest);
      expect(mockJson).toHaveBeenCalledWith({
        error: `Error: ${error.message}`,
      });
    });
  });

  describe("GetAllOccupancies", () => {
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


    it("should return all occupancies with status 200", async () => {
      const mockData = [
        { occupancy: 20 },
        { occupancy: 25 },
        { occupancy: 30 },
      ];
      (db.getOccupancyRecords as jest.Mock).mockResolvedValue(mockData);

      await Controller.allOccupancyRecords(req as Request, res as Response);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockJson).toHaveBeenCalledWith(mockData);
    });

    it("should return status 400 and an error message if db.getOccupancyRecords throws an error", async () => {
      const error = new Error("Database error");
      (db.getOccupancyRecords as jest.Mock).mockRejectedValue(error);

      await Controller.allOccupancyRecords(req as Request, res as Response);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BadRequest);
      expect(mockJson).toHaveBeenCalledWith({ error: `Error: ${error.message}` });
    });
  });

  describe("getAllMetadata", () => {
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

    it("should return metadata with status 200 when data is retrieved successfully", async () => {
      const mockData = [
        { name: "tepperFC", location: "Tepper" },
        { name: "cohon", location: "Cohon" },
      ];

      (Metadata.getAllMetadataHelper as jest.Mock).mockResolvedValue(mockData);

      await Controller.getAllMetadata(req as Request, res as Response);

      expect(Metadata.getAllMetadataHelper).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockJson).toHaveBeenCalledWith(mockData);
    });

    it("should return status 400 and an error message if getAllMetadataHelper throws an error", async () => {
      const error = new Error("Failed to retrieve metadata");
      (Metadata.getAllMetadataHelper as jest.Mock).mockRejectedValue(error);

      await Controller.getAllMetadata(req as Request, res as Response);

      expect(Metadata.getAllMetadataHelper).toHaveBeenCalled();
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BadRequest);
      expect(mockJson).toHaveBeenCalledWith({ error: `Error: ${error.message}` });
    });
  });

  describe("getMetadata", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockStatus: jest.Mock;
    let mockJson: jest.Mock;

    beforeEach(() => {
      mockStatus = jest.fn().mockReturnThis();
      mockJson = jest.fn();
      req = { params: { gym: "wiegand" } };
      res = { status: mockStatus, json: mockJson };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return metadata with status 200 for a valid gym", async () => {
      const mockData = {
        name: "Wiegand Gym",
        address: "123 Campus Drive",
        description: "The main campus gym with all facilities",
        maxOccupancy: 100,
        hours: {
          sunday: { open: "8:00 AM", close: "10:00 PM", description: "Open all day" },
          monday: { open: "6:00 AM", close: "10:00 PM", description: "Open all day" },
          tuesday: { open: "6:00 AM", close: "10:00 PM", description: "Open all day" },
          wednesday: { open: "6:00 AM", close: "10:00 PM", description: "Open all day" },
          thursday: { open: "6:00 AM", close: "10:00 PM", description: "Open all day" },
          friday: { open: "6:00 AM", close: "10:00 PM", description: "Open all day" },
          saturday: { open: "8:00 AM", close: "10:00 PM", description: "Open all day" },
        },
      };

      (Metadata.getGymMetadataHelper as jest.Mock).mockResolvedValue(mockData);

      await Controller.getMetadata(req as Request, res as Response);

      expect(Metadata.getGymMetadataHelper).toHaveBeenCalledWith("wiegand");
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockJson).toHaveBeenCalledWith(mockData);
    });

    it("should return status 400 and an error message if getGymMetadataHelper throws an error", async () => {
      const error = new Error("Gym not found");
      jest.spyOn(Metadata, "getGymMetadataHelper").mockRejectedValue(error);

      await Controller.getMetadata(req as Request, res as Response);

      expect(Metadata.getGymMetadataHelper).toHaveBeenCalledWith("wiegand");
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BadRequest);
      expect(mockJson).toHaveBeenCalledWith({ error: `Error: ${error.message}` });
    });
  });

  describe("createLogRecord", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockStatus: jest.Mock;
    let mockJson: jest.Mock;
  
    beforeEach(() => {
      mockStatus = jest.fn().mockReturnThis();
      mockJson = jest.fn();
      req = { params: { gym: "wiegand" }, body: { entries: 10, exits: 5 } };
      res = { status: mockStatus, json: mockJson };
      jest.spyOn(db, "insertLogRecords").mockResolvedValue(undefined);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("should insert a new record and return a success message", async () => {
      await Controller.createLogRecord(req as Request, res as Response);
  
      expect(db.insertLogRecords).toHaveBeenCalledWith([
        {
          gym: "wiegand",
          time: expect.any(Date),
          entries: 10,
          exits: 5,
        },
      ]);
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockJson).toHaveBeenCalledWith({ success: "Inserted record into wiegand" });
    });
  
    it("should return a 400 status and error message if no log is provided", async () => {
      req.body = {};
  
      await Controller.createLogRecord(req as Request, res as Response);
  
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BadRequest);
      expect(mockJson).toHaveBeenCalledWith({ error: "No log provided" });
    });
  
    it("should return a 400 status and error message if entries or exits are negative", async () => {
      req.body = { entries: -1, exits: 5 };
  
      await Controller.createLogRecord(req as Request, res as Response);
  
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BadRequest);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid log" });
    });
  
    it("should return a 400 status and error message if db.insertLogRecords throws an error", async () => {
      const error = new Error("Database error");
      (db.insertLogRecords as jest.Mock).mockRejectedValue(error);
  
      await Controller.createLogRecord(req as Request, res as Response);
  
      expect(db.insertLogRecords).toHaveBeenCalledWith([
        {
          gym: "wiegand",
          time: expect.any(Date),
          entries: 10,
          exits: 5,
        },
      ]);
      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BadRequest);
      expect(mockJson).toHaveBeenCalledWith({ error: `Error: ${error.message}` });
    });
  });
});
