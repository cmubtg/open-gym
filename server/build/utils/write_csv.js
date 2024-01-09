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
const fast_csv_1 = __importDefault(require("fast-csv"));
const fs_1 = __importDefault(require("fs"));
function writeToCSV(name, data, dataFormatFn) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileName = 'data/' + name + '_data.csv';
        const writeStream = fs_1.default.createWriteStream(fileName, { flags: 'a' });
        const csvStream = fast_csv_1.default
            .format({ writeHeaders: false })
            .transform(dataFormatFn);
        csvStream.pipe(writeStream);
        data.forEach((doc) => csvStream.write(doc));
        csvStream.end();
        fs_1.default.appendFileSync(fileName, '\n');
    });
}
exports.default = writeToCSV;
;
