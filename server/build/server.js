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
const node_cron_1 = __importDefault(require("node-cron"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes/routes"));
const database_1 = __importDefault(require("./models/database/database"));
const constants_1 = require("./utils/constants");
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// routes
app.use('/api/', routes_1.default);
// connect to database
mongoose_1.default.connect(constants_1.MONGO_URI) // eslint-disable-line no-undef
    .then(() => {
    console.log('Connected to database');
    // weekly clearing database
    node_cron_1.default.schedule('0 0 * * 0', () => __awaiter(void 0, void 0, void 0, function* () {
        database_1.default.moveAllRecords();
    }));
    // listen on port
    app.listen(constants_1.PORT, () => {
        // eslint-disable-next-line no-undef
        console.log('Listening on port', constants_1.PORT);
    });
})
    .catch((err) => console.log(err));
