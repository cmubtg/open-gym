import { Request, Response } from 'express';
import db from '../models/database';
import { GymName } from '../models/database.types';
import * as Metadata from '../services/gymMetadataService';
import * as Predict from '../services/predictOccupancyService';
import { HTTP_STATUS, TENSE } from '../utils/constants';
import { errorMessage } from '../utils/helper';

// Get every Record from every gym
export const getAllRecords = async (req: Request, res: Response) => {
  try {
    const records = await db.getRecords();
    res.status(HTTP_STATUS.OK).json(records);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage(error) });
  }
};

// Get every gym's occupancy
export const getAllOccupancy = async (req: Request, res: Response) => {
  try {
    // Call get most recent record for each gym
    const data = await db.getRecentRecords();

    // Return data in the form of [ {gym occupancy}, {gym occupancy}, ... }]
    res.status(HTTP_STATUS.OK).json(data);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage(error) });
  }

};

export const getOccupancy = async (req: Request, res: Response) => {
  try {
    const { gym } = req.params;
    const [record] = await db.getRecentRecords({ gym: gym as GymName});
    const { occupancy } = record;

    res.status(HTTP_STATUS.OK).json({ occupancy: occupancy });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage(error) });
  }

};

// TODO: Update to take specific gym into account
export const getAnalytics = (req: Request, res: Response) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Unimplemented' });
};

// Runs ML model to predict occupancy based on timestamp
export const predictOccupancy = async (req: Request, res: Response) => {
  // timestamp: ISO format string
  const { gym, timestamp } = req.params;
  const date = new Date(timestamp);
  try {
    Predict.validatePredictRequest(gym as GymName, timestamp);
    const prediction = await Predict.predictOccupancy(gym, date);
    res.status(HTTP_STATUS.OK).json({ occupancy: prediction });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage(error) });
  }
};

// TODO: Get all records from a specific gym
export const getRecords = async (req: Request, res: Response) => {
  const { gym } = req.params;

  try {
    const data = await db.getRecords({ gym: gym as GymName });
    res.status(HTTP_STATUS.OK).json(data);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage(error) });
  }
};

export const getAllMetadata = async (req: Request, res: Response) => {
  try {
    const data = await Metadata.getAllMetadataHelper();
    res.status(HTTP_STATUS.OK).json(data);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage(error) });
  }
};

export const getMetadata = async (req: Request, res: Response) => {
  const { gym } = req.params;
  try {
    const data = await Metadata.getGymMetadataHelper(gym as GymName); // Temporary until validation
    res.status(HTTP_STATUS.OK).json(data);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage(error) });
  }
};

// create a new session
export const createRecord = async (req: Request, res: Response) => {
  const { time, occupancy } = req.body; // TODO specify the type of time, occupancy
  const { gym } = req.params;

  // add to the database
  try {
    await db.insertOne({
      gym: gym as GymName,
      time: new Date(time as string),
      occupancy: occupancy as number
    }, TENSE.PRESENT);
    res.status(HTTP_STATUS.OK).json({ success: `Inserted record into ${gym}` });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: errorMessage(error) });
  }
};

// delete a session
export const deleteRecord = (req: Request, res: Response) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Unimplemented' });
};

// update a session
export const updateGymSession = (req: Request, res: Response) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Unimplemented' });
};
