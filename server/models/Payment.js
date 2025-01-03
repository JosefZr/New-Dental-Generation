import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: String,
    amount:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    type:{
        type: String,
        required: true,
    },
    completed:{
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
},{
    timestamps: true
})

const Payment = mongoose.model('Payment', taskSchema);
export default Payment;