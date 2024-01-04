import express from 'express';
import * as controller from '../controllers/sessionController.mjs';

const router = express.Router()

// Match routes to controller methods
router.get('/', controller.getAllRecords)
router.get('/occupancy', controller.getGymOccupancy)
router.get('/analytics', controller.getGymAnalytics)
router.get('/:id', controller.getGymSession)
router.post('/', controller.createGymSession)
// router.delete('/:id', controller.deleteSession)
// router.patch('/:id', controller.updateSession)


// router.get('/', controller.getAllRecords)
// router.get('/occupancy', controller.getAllOccupancy)
// router.get('/occupancy/:collection', controller.getGymOccupancy)
// router.get('/occupancy/:collection/:timestamp', controller.predictGymOccupancy)
// router.get('/analytics', controller.getAnalytics)
// router.get('/:collection', controller.getGymRecords)

// router.post('/:collection', controller.createRecord)

export default router