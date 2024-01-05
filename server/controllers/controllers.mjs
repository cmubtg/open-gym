import * as db from '../models/database.mjs';

// TODO: Show every gym and all records for that gym
export const getAllRecords = async (req, res) => {
  // list all gyms
  const collections = await db.getAllCollections();

  // Loop through each and call GymGetAllData

  // return all data
  res.status(200).json({res : "WIP"})
}

// TODO: Get the most recent record from every collection in database
export const getAllOccupancy = async (req, res) => {
  // Loop through all gyms. 
  const collections = await db.getAllCollections();

  // Call get most recent record for each gym

  // Return data in the form of { {gym occupancy}, {gym occupancy}, ... }}
  res.status(200).json({occupancy: 0});
}

export const getGymOccupancy = async (req, res) => {
    // // Get gym name from params
    // const { gym } = req.params;

    // // Get the most recent record from gym collection
    // const collection = await db.getCollection(gym);
    // const mostRecentRecord = await db.GymGetRecentRecord(collection);
    // return mostRecentRecord.count;

    let MAX_OCCUPANCY = 100;
    let occupancy = Math.floor(Math.random() * MAX_OCCUPANCY);
    res.status(200).json({count: occupancy});
  }

// TODO: Update to take specific gym into account
export const getGymAnalytics = async (req, res) => {

  const data = await db.GymGetAllData();
  const daysOfTheWeekMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const analyticsData = {};
  daysOfTheWeekMap.forEach(day => analyticsData[day] = 0);

  data.forEach(entry => {
    const dateObject = new Date(entry.time);
    analyticsData[daysOfTheWeekMap[dateObject.getDay()]] += 1;
  });
                  
  res.status(200).json(analyticsData);
}

// TODO: Runs ML model to predict occupancy based on timestamp and 
// Gym from params
export const predictGymOccupancy = async (req, res) => {
  const { gym, timestamp } = req.params
  res.status(404).json({message: "Unimplemented"})
}

// TODO: Get all records from a specific gym
export const getGymRecords = async (req, res) => {
  return db.GymGetAllRecords(req.params.gym);
}


// TODO: get a single session
export const getGymSession = async (req, res) => {
  const { gym, id } = req.params

  try {
    const session = await db.GymFindByID(gym, id);
    res.status(200).json(session);
  } catch (err) {
    res.status(404).json({error: 'No such session'})
  }
}

// create a new session
export const createRecord = async (req, res) => {
  const { time, occupancy } = req.body
  const { gym } = req.params

  // add to the database
  const testOccupancy = Math.floor(Math.random() * 100);
  try {
    console.log(`Inserting Record for ${gym}`);
    db.GymInsert(gym, testOccupancy);
    res.status(200).json({ success: "Working" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// delete a session
export const deleteRecord = async (req, res) => {
  res.status(404).json({message: "Unimplemented"})
}

// update a session
export const updateGymSession = async (req, res) => {
  res.status(404).json({message: "Unimplemented"})
}