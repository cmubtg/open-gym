"use strict";
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
exports.validatePredictReq = exports.predictOccupancy = void 0;
const database_1 = __importDefault(require("../database/database"));
const constants_1 = require("../../utils/constants");
const child_process_1 = require("child_process");
const util_1 = __importDefault(require("util"));
const isHoliday = (date) => {
    return true;
};
const isStartOfSemester = (date) => {
    return false;
};
const getTemperature = () => {
    return 72.0;
};
const isWeekend = (date) => {
    return date.getDay() % 6 === 0;
};
const execAsync = util_1.default.promisify(child_process_1.exec);
const parseTime = (time) => {
    const [hour, minute] = time.split(':');
    return [parseInt(hour, 10), parseInt(minute, 10)];
};
const getDateFromClock = (date, time) => {
    const [hour, minute] = parseTime(time);
    const newDate = new Date(date);
    newDate.setHours(hour);
    newDate.setMinutes(minute);
    return newDate;
};
const isClosed = (gym, date) => __awaiter(void 0, void 0, void 0, function* () {
    const metadata = yield database_1.default.getMetadata(gym);
    const day = constants_1.DAYS_OF_THE_WEEK[date.getDay()];
    const openDate = getDateFromClock(date, metadata.hours[day].open);
    const closeDate = getDateFromClock(date, metadata.hours[day].close);
    return openDate.getTime() > date.getTime() ||
        date.getTime() > closeDate.getTime();
});
// PUBLIC APIs
const predictOccupancy = (gym, date) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield isClosed(gym, date)) {
        return 0;
    }
    const script = 'forecast/predict.py';
    const cmd = `python ${script} 
    --day_of_week ${date.getDay()} 
    --month ${date.getMonth()} 
    --hour ${date.getHours()} 
    --is_weekend ${isWeekend(date)} 
    --is_holiday ${isHoliday(date)} 
    --is_start_of_semester ${isStartOfSemester(date)} 
    --temperature ${getTemperature()}`;
    // different OS use different newline breaks
    // Remove newline breaks
    const command = cmd.replace(/(\r\n|\n|\r)/gm, '');
    try {
        const { stdout } = yield execAsync(command);
        return parseInt(stdout, 10);
    }
    catch (error) {
        throw new Error(`Running Python Script error: ${error.message}`);
    }
});
exports.predictOccupancy = predictOccupancy;
const validatePredictReq = (gym, timestamp) => __awaiter(void 0, void 0, void 0, function* () {
    if (isNaN(Date.parse(timestamp))) {
        throw new Error('Invalid Timestamp');
    }
    const names = yield database_1.default.getAllNames();
    if (!names.includes(gym)) {
        throw new Error(`Invalid Gym ${gym}`);
    }
});
exports.validatePredictReq = validatePredictReq;
