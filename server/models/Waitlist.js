import mongoose from 'mongoose';

const waitlistSchema = new mongoose.Schema({
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
    unique: false 
  },
  number:{
    type:Number,
    required: false, 
  },
  why:{
    type:String,
    required: false, 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  type:{
    type: String, 
    default: 'waitlist', // Only allow 'waitlist' or 'leads'
    required: true 
  }
},{ 
  // Add compound index instead of unique on email
  indexes: [
    { email: 1, type: 1 } // This allows searching but not enforcing uniqueness
  ]
})

// Correct way to create and export the model
const Waitlist = mongoose.model('Waitlist', waitlistSchema);
export default Waitlist;