import mongoose from "mongoose";

const PrayerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User collection
    required: true,
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
    unique: true, // Ensure only one record per user per day
  },
  prayers: {
    fajr: { type: Boolean, default: false },
    dhur: { type: Boolean, default: false },
    asr: { type: Boolean, default: false },
    maghrib: { type: Boolean, default: false },
    isha: { type: Boolean, default: false },
  },
});

const Prayer = mongoose.model("Prayer", PrayerSchema);

export default Prayer;
