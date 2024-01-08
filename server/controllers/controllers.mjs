import * as db from '../models/database.mjs';
import * as predictOccupancy from '../utils/predictOccupancy.mjs';

// TODO: Show every gym and all records for that gym
export const getAllRecords = async (req, res) => {
  // list all gyms
  // const gyms = await db.getAllGymNames();

  // Loop through each and call gymGetAllRecords

  // return all data
  res.status(200).json({ res: 'WIP' });
};

// TODO: Get the most recent record from every collection in database
export const getAllOccupancy = async (req, res) => {
  // Loop through all gyms.
  // const gyms = await db.getAllGymNames();

  // Call get most recent record for each gym

  // Return data in the form of { {gym occupancy}, {gym occupancy}, ... }}
  res.status(200).json({ occupancy: 0 });
};

export const getGymOccupancy = async (req, res) => {
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
export const getGymAnalytics = async (req, res) => {
  const data = await db.gymGetAllData();
  const daysOfTheWeekMap = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const analyticsData = {};
  daysOfTheWeekMap.forEach((day) => analyticsData[day] = 0);

  data.forEach((entry) => {
    const dateObject = new Date(entry.time);
    analyticsData[daysOfTheWeekMap[dateObject.getDay()]] += 1;
  });

  res.status(200).json(analyticsData);
};

// Runs ML model to predict occupancy based on timestamp
export const predictGymOccupancy = async (req, res) => {
  // timestamp: ISO format string
  const { gym, timestamp } = req.params;
  const date = new Date(timestamp);
  try {
    await predictOccupancy.validatePredictReq(gym, date);
    const prediction = await predictOccupancy.predictOccupancy(gym, date);
    res.status(200).json({ occupancy: prediction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// TODO: Get all records from a specific gym
export const getGymRecords = async (req, res) => {
  const { gym } = req.params;

  try {
    const data = await db.gymGetAllRecords(gym);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// TODO: get a single session
export const getGymRecordById = async (req, res) => {
  const { gym, id } = req.params;

  try {
    const data = await db.gymFindById(gym, id);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// TODO: Implement getting metadata
export const getGymMetadata = async (req, res) => {

};

// create a new session
export const createGymRecord = async (req, res) => {
  const { time, occupancy } = req.body;
  const { gym } = req.params;

  // add to the database
  try {
    await db.gymInsert(gym, {
      time: new Date(time),
      occupancy: occupancy,
    });
    res.status(200).json({ success: `Inserted record into ${gym}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete a session
export const deleteRecord = async (req, res) => {
  res.status(404).json({ message: 'Unimplemented' });
};

// update a session
export const updateGymSession = async (req, res) => {
  res.status(404).json({ message: 'Unimplemented' });
};
