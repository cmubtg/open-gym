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
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../../utils/constants");
const database_types_1 = require("./database.types");
const write_csv_1 = __importDefault(require("../../utils/write_csv"));
const conn = mongoose_1.default.connection;
const db = {
    insert: (gym, data) => __awaiter(void 0, void 0, void 0, function* () {
        const collection = yield getGymCollection(gym);
        collection.create(data);
        mongoose_1.default.deleteModel(gym);
    }),
    getAllNames: () => __awaiter(void 0, void 0, void 0, function* () {
        const collections = yield getAllCollections();
        const collectionNames = collections.map((collection) => collection.name);
        return collectionNames.filter((name) => name !== constants_1.METADATA);
    }),
    getAllMetadata: () => __awaiter(void 0, void 0, void 0, function* () {
        const collection = yield getMetaDataCollection();
        const metadata = yield collection.find({});
        mongoose_1.default.deleteModel(constants_1.METADATA);
        return metadata;
    }),
    getRecords: (gym) => __awaiter(void 0, void 0, void 0, function* () {
        const collection = yield getGymCollection(gym);
        const records = yield collection.find({});
        mongoose_1.default.deleteModel(gym);
        return records;
    }),
    getRecentRecord: (gym) => __awaiter(void 0, void 0, void 0, function* () {
        const collection = yield getGymCollection(gym);
        const record = (yield collection.findOne().sort({ time: -1 })) || dummyRecord;
        mongoose_1.default.deleteModel(gym);
        return record;
    }),
    getMetadata: (gym) => __awaiter(void 0, void 0, void 0, function* () {
        const collection = yield getMetaDataCollection();
        const metadata = yield collection.find({ collection_name: gym });
        mongoose_1.default.deleteModel(constants_1.METADATA);
        return metadata[0];
    }),
    getGymById: (gym, id) => __awaiter(void 0, void 0, void 0, function* () {
        const collection = yield getGymCollection(gym);
        const record = (yield collection.findById(id)) || dummyRecord;
        mongoose_1.default.deleteModel(gym);
        return record;
    }),
    moveAllRecords: () => __awaiter(void 0, void 0, void 0, function* () {
        const collectionNames = yield db.getAllNames();
        yield Promise.all(collectionNames.map((collectionName) => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield db.getRecords(collectionName);
            const dataFormat = (doc) => ({
                time: doc.time.toISOString(),
                occupancy: doc.occupancy,
            });
            (0, write_csv_1.default)(collectionName, data, dataFormat);
        })));
        db.deleteAllRecords();
    }),
    deleteAllRecords: () => __awaiter(void 0, void 0, void 0, function* () {
        // *** Insert deletion code HERE ***
    }),
};
exports.default = db;
// PRIVATE HELPERS
const getAllCollections = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield conn.db.listCollections().toArray();
});
// Check if a collection exists
const collectionExists = (collection) => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield getAllCollections();
    return collections.some((c) => c.name === collection);
});
const getGymCollection = (collection) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure collection exists
    const gymNames = yield db.getAllNames();
    if (!gymNames.includes(collection)) {
        throw new Error(`Collection (${collection}) does not exist`);
    }
    return mongoose_1.default.model(collection, database_types_1.recordSchema, collection);
});
const getMetaDataCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    return mongoose_1.default.model(constants_1.METADATA, database_types_1.metaDataSchema, constants_1.METADATA);
});
const dummyRecord = {
    time: new Date(0),
    occupancy: 0
};
