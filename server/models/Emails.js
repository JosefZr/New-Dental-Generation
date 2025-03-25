import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

// Correct way to create and export the model
const Email = mongoose.model('Email', emailSchema);
export default Email;