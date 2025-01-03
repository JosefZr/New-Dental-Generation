// models/Task.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: false
  },
  startDate: {
    type: Date,
    required: false
  },
  startTime: {
    type: String,
    required: false
  },
  endDate: {
    type: Date
  },
  endTime: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  duration:{
    type:Number,
  },
  isRepeating: {
    type: Boolean,
    default: false
  },
  repeatDays: [{
    type: String,
    enum: ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'], // Days of the week
    required: function() {
      return this.isRepeating;
    }
  }],
  category: {
    type: String,
    default: 'General Tasks'
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

// Add indexes for better query performance
taskSchema.index({ userId: 1, startDate: 1 });
taskSchema.index({ userId: 1, completed: 1 });

const Task = mongoose.model('Task', taskSchema);
export default Task;