import { Request, Response } from "express";
import db from "../models/database";
import { GymName, Direction } from "../models/database.types";
import * as Metadata from "../services/gymMetadataService";
import * as Predict from "../services/predictOccupancyService";
import { HttpStatus, Collection, DIRECTIONS } from "../utils/constants";
import { errorMessage } from "../utils/helper";

// Get every Record from every gym
export const getAllRecords = async (req: Request, res: Response) => {
  try {
    const records = await db.getRecords();
    res.status(HttpStatus.OK).json(records);
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};

// Get records from a specific gym
export const getRecords = async (req: Request, res: Response) => {
  const { gym } = req.params;

  try {
    const data = await db.getRecords({ gym: gym as GymName });
    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};

// Get every gym's occupancy
export const getAllOccupancy = async (req: Request, res: Response) => {
  try {
    // Call get most recent record for each gym
    const data = await db.getRecentRecords();

    // Return data in the form of [ {gym occupancy}, {gym occupancy}, ... }]
    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};

export const getOccupancy = async (req: Request, res: Response) => {
  try {
    const { gym } = req.params;
    const [record] = await db.getRecentRecords({ gym: gym as GymName});
    const { occupancy } = record;
    res.status(HttpStatus.OK).json({ occupancy: occupancy });
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};

// Runs ML model to predict occupancy based on timestamp
export const predictOccupancy = async (req: Request, res: Response) => {
  // timestamp: ISO format string
  const { gym, timestamp } = req.params;
  const date = new Date(timestamp);
  try {
    Predict.validatePredictRequest(gym as GymName, timestamp);
    const prediction = await Predict.predictOccupancy(gym, date);
    res.status(HttpStatus.OK).json({ occupancy: prediction });
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};

export const getAllMetadata = async (req: Request, res: Response) => {
  try {
    const data = await Metadata.getAllMetadataHelper();
    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};

export const getMetadata = async (req: Request, res: Response) => {
  const { gym } = req.params;
  try {
    const data = await Metadata.getGymMetadataHelper(gym as GymName); // Temporary until validation
    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};

// TODO: Update to take specific gym into account
export const getAnalytics = (req: Request, res: Response) => {
  res.status(HttpStatus.NotFound).json({ message: "Unimplemented" });
};

// Insert a sensor log into the database
export const createRecord = async (req: Request, res: Response) => {
  const { log } = req.body;
  const { gym } = req.params;
  console.log(`Log ${log} for Gym ${gym}`);

  // Enforce valid log value (must be 1 or -1 when inserting in Collection.Log)
  if (!DIRECTIONS.includes(log)) {
    return res.status(HttpStatus.BadRequest).json({
      error: `Invalid log value. Must be one of: ${DIRECTIONS.join(", ")}`,
    });
  }

  // Insert into database
  try {
    await db.insertOne(
      {
        gym: gym as GymName,
        time: new Date(),
        log: log as Direction,
      },
      Collection.Log
    );
    res.status(HttpStatus.OK).json({ success: `Inserted record into ${gym}` });
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};
