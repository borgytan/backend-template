import { Schema } from 'mongoose';

export default new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
