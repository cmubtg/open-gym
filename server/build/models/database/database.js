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
exports.gymMoveAllRecords = exports.gymDeleteAllRecords = exports.gymGetMetadata = exports.gymGetAllMetadata = exports.gymGetAllRecords = exports.gymFindById = exports.gymGetRecentRecord = exports.gymInsert = exports.getAllGymNames = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../../utils/constants");
const database_types_1 = require("./database.types");
const write_csv_1 = __importDefault(require("../../utils/write_csv"));
const conn = mongoose_1.default.connection;
const getAllCollections = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield conn.db.listCollections().toArray();
});
// Check if a collection exists
const collectionExists = (collection) => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield getAllCollections();
    return collections.some((c) => c.name === collection);
});
// PUBLIC FUNCTIONS
const getAllGymNames = () => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield getAllCollections();
    const collectionNames = collections.map((collection) => collection.name);
    return collectionNames.filter((name) => name !== constants_1.METADATA);
});
exports.getAllGymNames = getAllGymNames;
const getCollection = (collection) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure collection exists
    const gymNames = yield (0, exports.getAllGymNames)();
    if (!gymNames.includes(collection)) {
        throw new Error(`Collection (${collection}) does not exist`);
    }
    return mongoose_1.default.model(collection, database_types_1.recordSchema, collection);
});
const getMetaDataCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    return mongoose_1.default.model(constants_1.METADATA, database_types_1.metaDataSchema, constants_1.METADATA);
});
// Insert into a collection
const gymInsert = (gym, data) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield getCollection(gym);
    collection.create(data);
    mongoose_1.default.deleteModel(gym);
});
exports.gymInsert = gymInsert;
// Get most recent record from a collection (gym)
const gymGetRecentRecord = (gym) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield getCollection(gym);
    const record = (yield collection.findOne().sort({ time: -1 })) || {};
    mongoose_1.default.deleteModel(gym);
    return record;
});
exports.gymGetRecentRecord = gymGetRecentRecord;
// gymFindById from a collection
const gymFindById = (gym, id) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield getCollection(gym);
    const record = (yield collection.findById(id)) || {};
    mongoose_1.default.deleteModel(gym);
    return record;
});
exports.gymFindById = gymFindById;
// Get all Records from a collection
const gymGetAllRecords = (gym) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield getCollection(gym);
    const records = yield collection.find({});
    mongoose_1.default.deleteModel(gym);
    return records;
});
exports.gymGetAllRecords = gymGetAllRecords;
// Get all metadata
const gymGetAllMetadata = () => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield getMetaDataCollection();
    const metadata = yield collection.find({});
    mongoose_1.default.deleteModel(constants_1.METADATA);
    return metadata;
});
exports.gymGetAllMetadata = gymGetAllMetadata;
// Get gym metadata
const gymGetMetadata = (gym) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield getMetaDataCollection();
    const metadata = yield collection.find({ collection_name: gym });
    mongoose_1.default.deleteModel(constants_1.METADATA);
    return metadata[0];
});
exports.gymGetMetadata = gymGetMetadata;
// Delete from a collection
const gymDeleteAllRecords = () => {
    // *** Insert deletion code HERE ***
};
exports.gymDeleteAllRecords = gymDeleteAllRecords;
// Move all data from a collection
const gymMoveAllRecords = () => __awaiter(void 0, void 0, void 0, function* () {
    const collectionNames = yield (0, exports.getAllGymNames)();
    yield Promise.all(collectionNames.map((collectionName) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield (0, exports.gymGetAllRecords)(collectionName);
        const dataFormat = (doc) => ({
            time: doc.time.toISOString(),
            occupancy: doc.occupancy,
        });
        (0, write_csv_1.default)(collectionName, data, dataFormat);
    })));
    (0, exports.gymDeleteAllRecords)();
});
exports.gymMoveAllRecords = gymMoveAllRecords;
