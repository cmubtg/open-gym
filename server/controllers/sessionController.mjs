import * as db from '../models/sessionModel.mjs'
import mongoose from 'mongoose'


// Get occupancy
export const getOccupancy = async (req, res) => {
    let MAX_OCCUPANCY = 100;
    let occupancy = Math.floor(Math.random() * MAX_OCCUPANCY);
    res.status(200).json({count: occupancy});
  }

// get all sessions
export const getAllSessions = async (req, res) => {
  const sessions = await db.getAllData().sort({createdAt: -1});
  res.status(200).json(sessions)
}

export const getAnalytics = async (req, res) => {

  const data = await db.getAllData();
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
export const getSession = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such session'})
  }

  const session = await db.findById(id);

  if (!session) {
    return res.status(404).json({error: 'No such session'})
  }

  res.status(200).json(session)
}

// create a new session
export const createSession = async (req, res) => {
  const {id, time} = req.body

  // add to the database
  try {
    const session = await db.create({ id, time });
    res.status(200).json(session)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// delete a session
export const deleteSession = async (req, res) => {
  res.status(404).json({message: "Unimplemented"})
}

// update a session
export const updateSession = async (req, res) => {
  res.status(404).json({message: "Unimplemented"})
}