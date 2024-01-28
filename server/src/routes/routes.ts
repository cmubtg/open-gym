/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import * as controller from '../controllers/controllers';

const router = express.Router(); // eslint-disable-line new-cap

// Match routes to controller methods
router.get('/', controller.getAllRecords);
router.get('/metadata', controller.getAllMetadata);
router.get('/metadata/:gym', controller.getMetadata);
router.get('/hours/:gym/:date', controller.getWeekSchedule);
router.get('/occupancy', controller.getAllOccupancy);
router.get('/occupancy/:gym', controller.getOccupancy);
router.get('/occupancy/:gym/:timestamp', controller.predictOccupancy);
router.get('/analytics', controller.getAnalytics);
router.get('/:gym', controller.getRecords);

// Bluetooth scan hits here
router.post('/:gym', controller.createRecord);

export default router;