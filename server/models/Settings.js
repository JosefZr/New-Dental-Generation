import mongoose from 'mongoose';
const SettingsSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    goal:{
        type: Number,
        required: true,
        default:2000
    },
    currency:{
        type:String,
        required:true,
        default: 'DZ'
    },
    IstighfarGoal:{
        type:Number,
        required:true,
        default: 100
    },
    Sunnah:{
        type:Boolean,
        default: false
    },
    topDentist:{
        type:Boolean,
        default: false
    }
},{
    timestamps: true
})
const Settings = mongoose.model('Settings', SettingsSchema);
export default Settings;