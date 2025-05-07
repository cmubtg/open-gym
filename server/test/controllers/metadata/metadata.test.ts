import { Request, Response } from "express";
import * as Controller from "@/controllers";
import { HttpStatus } from "@/utils";
import * as Metadata from "@/services/gym-metadata-service";

jest.mock("@/services/gym-metadata-service");
jest.mock("@/utils/helper", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  errorMessage: jest.fn((error) => `Error: ${error.message}`),
}));

describe("Metadata Controller Tests", () => {
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
});
