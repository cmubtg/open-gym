import { Request, Response } from "express";
import * as Controller from "@/controllers";
import db from "@/models/database";
import { HttpStatus } from "@/utils";

jest.mock("@/models/database");
jest.mock("@/utils/helper", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  errorMessage: jest.fn((error) => `Error: ${error.message}`),
}));

describe("Log Record Controller Tests", () => {
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