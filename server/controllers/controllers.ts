import { Request, Response } from 'express';
import db from '../models/database/database';
import * as predict from '../models/helper/predict_occupancy';
import {BTG_Record, BTG_Gym_Record, BTG_Metadata, BTG_Gym_Occupancy} from '../models/database/database.types';
import {HTTP_STATUS} from '../utils/constants'

// Get every Record from every gym
export const getAllRecords = async (req: Request, res: Response) => {
  try {
    const records = await db.getAllRecords();
    res.status(HTTP_STATUS.OK).json(records);
  }
  catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

// Get every gym's occupancy
export const getAllOccupancy = async (req: Request, res: Response) => {
  try {
    const gyms = await db.getAllNames();
    const result : BTG_Gym_Occupancy[] = []; 

    // Call get most recent record for each gym  
    for (let i = 0; i < gyms.length; i++) {
      const gym : string = gyms[i];
      const mostRecentRecord : BTG_Record = await db.getRecentRecord(gym);  
      result.push( { gym: gym, occupancy: mostRecentRecord.occupancy} ); 
    }  

    // Return data in the form of [ {gym occupancy}, {gym occupancy}, ... }]
    res.status(HTTP_STATUS.OK).json({ result });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
  
};

export const getOccupancy = async (req: Request, res: Response) => {
  try {
    const {gym} = req.params;
    const mostRecentRecord : BTG_Record = await db.getRecentRecord(gym);
    // const finalOccupancy : BTG_Occupancy = {count: mostRecentRecord.occupancy};
    
    // Use Random val
    const MAX_OCCUPANCY : number = 100;
    const occupancy : number = Math.floor(Math.random() * MAX_OCCUPANCY);
    const finalOccupancy : BTG_Gym_Occupancy = {gym: gym, occupancy: occupancy};

    res.status(HTTP_STATUS.OK).json(finalOccupancy);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
  
};

// TODO: Update to take specific gym into account
export const getAnalytics = async (req: Request, res: Response) => {
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
    const metadataArr : BTG_Metadata[] = await db.getAllMetadata();
    res.status(HTTP_STATUS.OK).json(metadataArr);
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
}

export const getMetadata = async (req: Request, res: Response) => {
  try { 
    const {gym} = req.params;
    const meta : BTG_Metadata = await db.getMetadata(gym);  
    res.status(HTTP_STATUS.OK).json(meta); 
  } catch (error) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
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
    res.status(HTTP_STATUS.OK).json({ success: `Inserted record into ${gym}` });
  } catch (err) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: err.message });
  }
};

// delete a session
export const deleteRecord = async (req: Request, res: Response) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Unimplemented' });
};

// update a session
export const updateGymSession = async (req: Request, res: Response) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'Unimplemented' });
};
