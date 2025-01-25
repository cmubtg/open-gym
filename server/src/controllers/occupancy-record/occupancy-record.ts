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
