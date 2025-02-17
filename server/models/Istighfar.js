import mongoose from 'mongoose';

const IstighfarSchema = new mongoose.Schema({
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

const Istighfar = mongoose.model('Istighfar', IstighfarSchema);
export default Istighfar;