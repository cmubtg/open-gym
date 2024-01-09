"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGymSession = exports.deleteRecord = exports.createGymRecord = exports.getGymMetadata = exports.getGymRecordById = exports.getGymRecords = exports.predictGymOccupancy = exports.getGymAnalytics = exports.getGymOccupancy = exports.getAllOccupancy = exports.getAllRecords = void 0;
const database_1 = __importDefault(require("../models/database/database"));
const predictOccupancy = __importStar(require("../models/helper/predict_occupancy"));
// TODO: Show every gym and all records for that gym
const getAllRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // list all gyms
    // const gyms = await db.getAllGymNames();
    // Loop through each and call gymGetAllRecords
    // return all data
    res.status(200).json({ res: 'WIP' });
});
exports.getAllRecords = getAllRecords;
// TODO: Get the most recent record from every collection in database
const getAllOccupancy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Loop through all gyms.
    // const gyms = await db.getAllGymNames();
    // Call get most recent record for each gym
    // Return data in the form of { {gym occupancy}, {gym occupancy}, ... }}
    res.status(200).json({ occupancy: 0 });
});
exports.getAllOccupancy = getAllOccupancy;
const getGymOccupancy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // // Get gym name from params
    // const { gym } = req.params;
    // // Get the most recent record from gym collection
    // const collection = await db.getCollection(gym);
    // const mostRecentRecord = await db.GymGetRecentRecord(collection);
    // return mostRecentRecord.count;
    const MAX_OCCUPANCY = 100;
    const occupancy = Math.floor(Math.random() * MAX_OCCUPANCY);
    res.status(200).json({ count: occupancy });
});
exports.getGymOccupancy = getGymOccupancy;
// TODO: Update to take specific gym into account
const getGymAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(404).json({ message: 'Unimplemented' });
});
exports.getGymAnalytics = getGymAnalytics;
// Runs ML model to predict occupancy based on timestamp
const predictGymOccupancy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // timestamp: ISO format string
    const { gym, timestamp } = req.params;
    const date = new Date(timestamp);
    try {
        yield predictOccupancy.validatePredictReq(gym, timestamp);
        const prediction = yield predictOccupancy.predictOccupancy(gym, date);
        res.status(200).json({ occupancy: prediction });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.predictGymOccupancy = predictGymOccupancy;
// TODO: Get all records from a specific gym
const getGymRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gym } = req.params;
    try {
        const data = yield database_1.default.getRecords(gym);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.getGymRecords = getGymRecords;
// TODO: get a single session
const getGymRecordById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { gym, id } = req.params;
    try {
        const data = yield database_1.default.getGymById(gym, id);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.getGymRecordById = getGymRecordById;
// TODO: Implement getting metadata
const getGymMetadata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getGymMetadata = getGymMetadata;
// create a new session
const createGymRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { time, occupancy } = req.body;
    const { gym } = req.params;
    // add to the database
    try {
        yield database_1.default.insert(gym, {
            time: new Date(time),
            occupancy: occupancy,
        });
        res.status(200).json({ success: `Inserted record into ${gym}` });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.createGymRecord = createGymRecord;
// delete a session
const deleteRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(404).json({ message: 'Unimplemented' });
});
exports.deleteRecord = deleteRecord;
// update a session
const updateGymSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(404).json({ message: 'Unimplemented' });
});
exports.updateGymSession = updateGymSession;
