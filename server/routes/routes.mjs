import express from 'express';
import * as controller from '../controllers/sessionController.mjs';

const router = express.Router()

// Match routes to controller methods
router.get('/', controller.getAllSessions)
router.get('/:id', controller.getSession)
router.get('/occupancy', controller.getOccupancy)
router.get('/analytics', controller.getAnalytics)
router.post('/', controller.createSession)
// router.delete('/:id', controller.deleteSession)
// router.patch('/:id', controller.updateSession)

export default router