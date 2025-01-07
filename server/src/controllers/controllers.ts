import { Request, Response } from "express";
import db from "../models/database";
import { GymName } from "../models/database.types";
import * as Metadata from "../services/gymMetadataService";
import * as Predict from "../services/predictOccupancyService";
import { HttpStatus, Collection } from "../utils/constants";
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
    // const [record] = await db.getRecentRecords({ gym: gym as GymName});
    // const { occupancy } = record;

    // get random occupancy for now
    const occupancy = Math.floor(Math.random() * 100);

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

// create a new record
export const createRecord = async (req: Request, res: Response) => {
  const { direction } = req.body;
  console.log(req.body);
  console.log("received action: ", direction);
  const { gym } = req.params;

  // get the current time
  const time = new Date();

  // add to the database
  try {
    // TODO: update to calculate running account and insert into specialized
    // sensor data db.
    await db.insertOne(
      {
        gym: gym as GymName,
        time: time,
        occupancy: direction as number,
      },
      Collection.Current
    );
    res.status(HttpStatus.OK).json({ success: `Inserted record into ${gym}` });
  } catch (error) {
    res.status(HttpStatus.BadRequest).json({ error: errorMessage(error) });
  }
};
