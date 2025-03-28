import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: false, 
  },
  location: { 
    type: String,
    required: false,  
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  number:{
    type:Number,
    required: false, 
  },
  why:{
    type:String,
    required: false, 
  },
  type:{
    type:String,
    required: true, 
    enum: ['waitlist', 'lead'], // Only allow these values
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

// Correct way to create and export the model
const Email = mongoose.model('Email', emailSchema);
export default Email;