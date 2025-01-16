import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
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
})

const Inventory = mongoose.model('Inventory', taskSchema);
export default Inventory;