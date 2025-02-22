import mongoose from "mongoose";

const PrayerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,
    unique: false
  },
  prayers: {
    fajr: { type: Boolean, default: false },
    dhur: { type: Boolean, default: false },
    asr: { type: Boolean, default: false },
    maghrib: { type: Boolean, default: false },
    isha: { type: Boolean, default: false },
  },
});

// Ensure userId + date is unique
PrayerSchema.index({ userId: 1, date: 1 }, { unique: true });

const Prayer = mongoose.model("Prayer", PrayerSchema);

export default Prayer;
