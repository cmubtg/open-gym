import { Request, Response } from "express";
import db from "../models/database";
import { GymName, LogRecordType } from "../models/database.types";
import * as Metadata from "../services/gymMetadataService";
import * as Predict from "../services/predictOccupancyService";
import { GYM_NAMES, HttpStatus, Collection } from "../utils/constants";
import { errorMessage } from "../utils/helper";

// Get every Record from every gym
export const getAllRecords = async (req: Request, res: Response) => {
  try {
    const records = await db.getOccupancyRecords();
    res.status(HttpStatus.OK).json(records);
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};

// Get records from a specific gym
export const getRecords = async (req: Request, res: Response) => {
  const { gym } = req.params;

  try {
    const data = await db.getOccupancyRecords({ gym: gym as GymName });
    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};

// Get every gym's occupancy
export const getAllOccupancy = async (req: Request, res: Response) => {
  try {
    // Call get most recent record for each gym
    const data = [];
    for (const gym of Object.values(GYM_NAMES)) {
      const records = await db.getOccupancyRecords({ gym: gym });
      const record = records[0];
      data.push({ gym: gym, record: record });
    }

    // Return data in the form of [ {gym occupancyRecord}, ... }]
    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};

export const getOccupancy = async (req: Request, res: Response) => {
  try {
    const { gym } = req.params;
    const records = await db.getOccupancyRecords({ gym: gym as GymName });
    const { occupancy } = records[0];
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
  const { entries, exits } = req.body;
  const { gym } = req.params;

  // Validate input
  if (!entries && !exits) {
    res.status(HttpStatus.BadRequest).json({ error: "No log provided" });
    return;
  }
  if (entries < 0 || exits < 0) {
    res.status(HttpStatus.BadRequest).json({ error: "Invalid log" });
    return;
  }

  // Insert into database
  try {
    const logRecord: LogRecordType = {
      gym: gym as GymName,
      time: new Date(),
      entries: entries as number,
      exits: exits as number,
    };
    await db.insertLogRecords([logRecord]);
    res.status(HttpStatus.OK).json({ success: `Inserted record into ${gym}` });
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};
