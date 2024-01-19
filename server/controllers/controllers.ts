import { Request, Response } from 'express';
import db from '../models/database/database';
import * as predict from '../models/helper/predict_occupancy';
import { OccupancyRecord, CurrentGymOccupancy, Metadata } from '../models/database/database.types';
import { HTTP_STATUS } from '../utils/constants';

// Get every Record from every gym
export const getAllRecords = async (req: Request, res: Response) => {
  try {
    const records = await db.getAllRecords();
    res.status(HTTP_STATUS.OK).json(records);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

// Get every gym's occupancy
export const getAllOccupancy = async (req: Request, res: Response) => {
  try {
    const gyms = await db.getAllNames();

    // Call get most recent record for each gym
    const result: CurrentGymOccupancy[] = await Promise.all(gyms.map(async (gym) => {
      const { occupancy } = await db.getRecentRecord(gym);
      return { gym: gym, occupancy: occupancy };
    }));

    // Return data in the form of [ {gym occupancy}, {gym occupancy}, ... }]
    res.status(HTTP_STATUS.OK).json(result);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }

};

export const getOccupancy = async (req: Request, res: Response) => {
  try {
    const {gym} = req.params;
    const mostRecentRecord: OccupancyRecord = await db.getRecentRecord(gym);
    // const finalOccupancy : BTG_Occupancy = {count: mostRecentRecord.occupancy};

    // Use Random val
    const MAX_OCCUPANCY = 100;
    const occupancy = Math.floor(Math.random() * MAX_OCCUPANCY);

    res.status(HTTP_STATUS.OK).json({ occupancy: occupancy });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
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
    await predict.validatePredictReq(gym, timestamp);
    const prediction = await predict.predictOccupancy(gym, date);
    res.status(HTTP_STATUS.OK).json({ occupancy: prediction });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

// TODO: Get all records from a specific gym
export const getRecords = async (req: Request, res: Response) => {
  const { gym } = req.params;

  try {
    const data = await db.getRecords(gym);
    res.status(HTTP_STATUS.OK).json(data);
  } catch (err) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
  }
};

export const getGymRecordById = async (req: Request, res: Response) => {
  const { gym, id } = req.params;
  try {
    const data = await db.getGymById(gym, id);
    res.status(HTTP_STATUS.OK).json(data);
  } catch (err) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
  }
};

export const getAllMetadata = async (req: Request, res: Response) => {
  try {
    const metadataArr: Metadata[] = await db.getAllMetadata();
    res.status(HTTP_STATUS.OK).json(metadataArr);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

export const getMetadata = async (req: Request, res: Response) => {
  try {
    const {gym} = req.params;
    const meta : Metadata = await db.getMetadata(gym);
    res.status(HTTP_STATUS.OK).json(meta);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

// create a new session
export const createRecord = async (req: Request, res: Response) => {
  const { time, occupancy } = req.body; // TODO specify the type of time, occupancy
  const { gym } = req.params;

  // add to the database
  try {
    await db.insert(gym, {
      time: new Date(time),
      occupancy: occupancy,
    });
    res.status(HTTP_STATUS.OK).json({ success: `Inserted record into ${gym}` });
  } catch (err) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
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
