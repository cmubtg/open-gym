const express = require('express')
const {
    getOccupancy,
    getAllSessions,
    getSession,
    createSession,
    deleteSession,
    updateSession
} = require('../controllers/sessionController.js')

const router = express.Router()

// GET all Sessions
router.get('/', getAllSessions)

// Get occupancy level
router.get('/occupancy', getOccupancy)

// GET a single session
router.get('/:id', getSession)

// POST a new session
router.post('/', createSession)

// DELETE a session
// router.delete('/:id', deleteSession)

// UPDATE a session
// router.patch('/:id', updateSession)

module.exports = router