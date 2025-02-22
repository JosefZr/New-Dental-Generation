import mongoose from "mongoose";
const DikrShemaSchema = new mongoose.Schema({
    name:String,
    startTime: { type: String, required: true }, // Store time as string e.g., "08:00"
    endTime: { type: String, required: true }, // Store time as string e.g., "20:00"
    interval: { type: Number, required: true } // Gap in minutes between Adkar reminders
})
const AdkarScheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Track by user
  adkar: [DikrShemaSchema], // The Adkar text
});

const Adkar = mongoose.model('Adkar', AdkarScheduleSchema);


export default Adkar;