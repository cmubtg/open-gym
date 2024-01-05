import express from 'express';
import * as controller from '../controllers/controllers.mjs';

const router = express.Router()

// Match routes to controller methods
router.get('/', controller.getAllRecords)
router.get('/occupancy', controller.getAllOccupancy)
router.get('/occupancy/:gym', controller.getGymOccupancy)
router.get('/occupancy/:gym/:timestamp', controller.predictGymOccupancy)
router.get('/analytics', controller.getGymAnalytics)
router.get('/:gym', controller.getGymRecords)

// Bluetooth scan hits here
router.post('/:gym', controller.createRecord)

export default router