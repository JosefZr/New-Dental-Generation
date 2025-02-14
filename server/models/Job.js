// models/Task.js
import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    diploma: {
        type: String,
        required: false
    },
    experience: {
        type: String,
        required: false
    },
    whyJob: {
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

const Job = mongoose.model('Job', JobSchema);
export default Job;