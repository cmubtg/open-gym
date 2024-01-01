import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const sessionSchema = new Schema({
    id: {type: Number, required: true},
    time: {type: Date, required: true},
}, {timestamps: true});

export default mongoose.model('Session', sessionSchema);

