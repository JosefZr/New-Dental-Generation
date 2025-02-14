// models/Task.js
import mongoose from 'mongoose';

const analyseSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true
    },
    email: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: false
    },
    Phone: {
        type: Number,
        required: false
    },
    question: {
        type: String,
        required: false
    },
    adSpend: {
        type: String,
        required: false
    },
    website: {
        type: String,
        default: false
    },
    service:{
        type: String,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
    }, {
    timestamps: true
});

const Analyse = mongoose.model('Analyse', analyseSchema);
export default Analyse;