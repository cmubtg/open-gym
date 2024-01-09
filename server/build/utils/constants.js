"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAYS_OF_THE_WEEK = exports.METADATA = exports.PORT = exports.MONGO_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // load env variables
exports.MONGO_URI = process.env.MONGO_URI;
exports.PORT = process.env.PORT;
exports.METADATA = 'metadata';
exports.DAYS_OF_THE_WEEK = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
];
