import mongoose from 'mongoose';

const leadsSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: false 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    type:{
        type: String, 
        default: 'lead', // Only allow 'waitlist' or 'leads'
        required: true 
    }
    },{ 
    // Add compound index instead of unique on email
    indexes: [
        { email: 1, type: 1 } // This allows searching but not enforcing uniqueness
    ]
})

// Correct way to create and export the model
const Leads = mongoose.model('Leads', leadsSchema);
export default Leads;