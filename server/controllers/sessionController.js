const Session = require('../models/sessionModel')
const mongoose = require('mongoose')


// Get occupancy
const getOccupancy = async (req, res) => {
    // const sessions = await Session.find({}).sort({createdAt: -1})
    let MAX_OCCUPANCY = 100;
    let occupancy = Math.floor(Math.random() * MAX_OCCUPANCY);
    res.status(200).json({count: occupancy});
  }

// get all sessions
const getAllSessions = async (req, res) => {
  const sessions = await Session.find({}).sort({createdAt: -1})

  res.status(200).json(sessions)
}


// get a single workout
const getSession = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const session = await Session.findById(id)

  if (!session) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(session)
}

// create a new workout
const createSession = async (req, res) => {
  const {id, time} = req.body

  // add to the database
  try {
    const session = await Session.create({ id, time })
    res.status(200).json(session)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// delete a session
const deleteSession = async (req, res) => {

}

// update a session
const updateSession = async (req, res) => {

}

module.exports = {
    getOccupancy,
    getAllSessions,
    getSession,
    createSession,
    deleteSession,
    updateSession
}