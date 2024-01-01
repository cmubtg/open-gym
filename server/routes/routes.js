const express = require('express')
const {
    getOccupancy,
    getAllSessions,
    getSession,
    createSession,
    deleteSession,
    updateSession, 
    getAnalytics,
} = require('../controllers/sessionController.js')

const router = express.Router()

// GET all Sessions
router.get('/', getAllSessions)

// Get occupancy level
router.get('/occupancy', getOccupancy)

router.get('/analytics', getAnalytics)

// GET a single session
router.get('/:id', getSession)

// localhost:4000/api/4/
// POST a new session
router.post('/', createSession)

// DELETE a session
// router.delete('/:id', deleteSession)

// UPDATE a session
// router.patch('/:id', updateSession)

module.exports = router