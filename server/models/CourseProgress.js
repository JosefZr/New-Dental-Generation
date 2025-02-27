import mongoose from "mongoose";

const LectureProgressSchema = new mongoose.Schema({
  lectureId: String,
  viewed: Boolean,
  dateViewed: Date
});

const SubModuleProgressSchema = new mongoose.Schema({
  subModuleId: String, // Corrected field name
  completed: Boolean,
  lectures: [LectureProgressSchema]
});

const ModuleProgressSchema = new mongoose.Schema({
  moduleId: String,
  completed: Boolean,
  subModules: [SubModuleProgressSchema] // Corrected field name
});

const CourseProgressSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  completed: Boolean,
  completionDate: Date,
  isFavorite: { type: Boolean, default: false },
  moduleProgress: [ModuleProgressSchema]
});

const CourseProgress = mongoose.model('Progress', CourseProgressSchema);
export default CourseProgress;