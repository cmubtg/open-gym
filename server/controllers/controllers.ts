import { Request, Response } from 'express';
import db from '../models/database/database';
import * as predict from '../models/helper/predict_occupancy';

// Get every Record from every gym
export const getAllRecords = async (req: Request, res: Response) => {
  const records = await db.getAllRecords();
  res.status(200).json(records);
};

// TODO: Get the most recent record from every collection in database
export const getAllOccupancy = async (req: Request, res: Response) => {
  // Loop through all gyms.
  // const gyms = await db.getAllGymNames();

  // Call get most recent record for each gym

  // Return data in the form of { {gym occupancy}, {gym occupancy}, ... }}
  res.status(200).json({ occupancy: 0 });
};

export const getOccupancy = async (req: Request, res: Response) => {
  // // Get gym name from params
  // const { gym } = req.params;

  // // Get the most recent record from gym collection
  // const collection = await db.getCollection(gym);
  // const mostRecentRecord = await db.GymGetRecentRecord(collection);
  // return mostRecentRecord.count;

  const MAX_OCCUPANCY = 100;
  const occupancy = Math.floor(Math.random() * MAX_OCCUPANCY);
  res.status(200).json({ count: occupancy });
};

// TODO: Update to take specific gym into account
export const getAnalytics = async (req: Request, res: Response) => {
    res.status(404).json({ message: 'Unimplemented' });
};

// Runs ML model to predict occupancy based on timestamp
export const predictOccupancy = async (req: Request, res: Response) => {
  // timestamp: ISO format string
  const { gym, timestamp } = req.params;
  const date = new Date(timestamp);
  try {
    await predict.validatePredictReq(gym, timestamp);
    const prediction = await predict.predictOccupancy(gym, date);
    res.status(200).json({ occupancy: prediction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// TODO: Get all records from a specific gym
export const getRecords = async (req: Request, res: Response) => {
  const { gym } = req.params;

  try {
    const data = await db.getRecords(gym);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// TODO: get a single session
export const getGymRecordById = async (req: Request, res: Response) => {
  const { gym, id } = req.params;

  try {
    const data = await db.getGymById(gym, id);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// TODO: Implement getting metadata
export const getGymMetadata = async (req: Request, res: Response) => {

};

// create a new session
export const createRecord = async (req: Request, res: Response) => {
  const { time, occupancy } = req.body;
  const { gym } = req.params;

  // add to the database
  try {
    await db.insert(gym, {
      time: new Date(time),
      occupancy: occupancy,
    });
    res.status(200).json({ success: `Inserted record into ${gym}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete a session
export const deleteRecord = async (req: Request, res: Response) => {
  res.status(404).json({ message: 'Unimplemented' });
};

// update a session
export const updateGymSession = async (req: Request, res: Response) => {
  res.status(404).json({ message: 'Unimplemented' });
};
