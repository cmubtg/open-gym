// Controller actions that interact with Occupancy Records.
import { Request, Response } from "express";
import db from "@/models/database";
import { HttpStatus, GymName, errorMessage } from "@/utils";

// Get every Occupancy Record from every gym
export const allOccupancyRecords = async (req: Request, res: Response) => {
  try {
    const records = await db.getOccupancyRecords();
    res.status(HttpStatus.OK).json(records);
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};

// Get records from a specific gym
export const gymOccupancyRecords = async (req: Request, res: Response) => {
  const { gym } = req.params;

  try {
    const records = await db.getOccupancyRecords({ gym: gym as GymName });
    res.status(HttpStatus.OK).json(records);
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};

// Insert new occupancy record.
export const createOccupancyRecord = async (req: Request, res: Response) => {
  const { occupancy } = req.body;
  const { gym } = req.params;

  // Validate input
  if (!occupancy) {
    res.status(HttpStatus.BadRequest).json({ error: "No occupancy provided" });
    return;
  }
  if (occupancy < 0) {
    res.status(HttpStatus.BadRequest).json({ error: "Invalid occupancy" });
    return;
  }

  // Insert into database
  try {
    const occupancyRecord = {
      gym: gym as GymName,
      occupancy: occupancy as number,
      time: new Date(),
    };
    await db.insertOccupancyRecords([occupancyRecord]);
    res.status(HttpStatus.OK).json({ success: `Inserted record into ${gym}` });
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};
