/* eslint-disable @typescript-eslint/no-misused-promises */
import express from "express";
import * as controller from "@/controllers";

const router = express.Router(); // eslint-disable-line new-cap

// Occupancy Record Routes.
router.get("/occupancy-record", controller.allOccupancyRecords);
router.get("/occupancy-record/:gym", controller.gymOccupancyRecords);

// Log Record Routes.
router.get("/log-record", controller.allLogRecords);
router.get("/log-record/:gym", controller.gymLogRecords);
router.post("/log-record/:gym/new", controller.createLogRecord); // Scanner hits this route

// Other Routes.
router.get("/metadata-record", controller.getAllMetadata);
router.get("/metadata-record/:gym", controller.getMetadata);
router.get("/analytics", controller.getAnalytics);

// Deprecated/TODO
// router.get("/occupancy", controller.getAllOccupancy);
// router.get("/occupancy/:gym", controller.getOccupancy);
// router.get("/occupancy/:gym/:timestamp", controller.predictOccupancy);

export default router;
