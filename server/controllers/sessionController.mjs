import * as db from '../models/database.mjs';

// Show every gym and all records for that gym
export const getAllRecords = async (req, res) => {
  const sessions = await db.GymGetAllData();
  res.status(200).json({res : "WIP"})
}

// get the most recent record from every collection in database
export const getAllOccupancy = async (req, res) => {
  const allGyms = await db.GymGetAllData();
  const occupancy = allGyms.map(session => session.occupancy);
  res.status(200).json({occupancy: occupancy});
}

// Get occupancy
export const getGymOccupancy = async (req, res) => {
    let MAX_OCCUPANCY = 100;
    let occupancy = Math.floor(Math.random() * MAX_OCCUPANCY);
    res.status(200).json({count: occupancy});
  }

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

// get a single session
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
export const createGymSession = async (req, res) => {
  const { gym, occupancy } = req.body

  // add to the database
  const testOccupancy = Math.floor(Math.random() * 100);
  try {
    db.insert(gym, testOccupancy);
    res.status(200).json({ success: "Working" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// delete a session
export const deleteGymSession = async (req, res) => {
  res.status(404).json({message: "Unimplemented"})
}

// update a session
export const updateGymSession = async (req, res) => {
  res.status(404).json({message: "Unimplemented"})
}