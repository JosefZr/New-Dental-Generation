import mongoose from 'mongoose';
const Quotes = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    name: String,
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
})

const Quoates = mongoose.model('Quoates', Quotes);
export default Quoates;